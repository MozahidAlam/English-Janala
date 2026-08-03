"use client";

/**
 * Pronunciation playback, hardened for mobile browsers.
 *
 * Three things make phones different from desktop and each needs handling:
 *
 * 1. iOS Safari refuses `speechSynthesis.speak()` unless the engine has been
 *    started once from inside a real user gesture — so we prime it on the first
 *    touch anywhere on the page.
 * 2. Chrome on Android frequently leaves the engine in a `paused` state after a
 *    `cancel()`, which silently swallows the next utterance — so we `resume()`.
 * 3. Some Android builds ship no usable English voice at all. There we fall back
 *    to the recorded MP3 from the dictionary API, watched by a timer that fires
 *    if the synthesiser never actually starts.
 */
import { useCallback, useEffect, useRef, useState } from "react";

let cachedVoice: SpeechSynthesisVoice | null = null;
let voicesReady = false;
/** iOS only allows speech after the engine has run once inside a gesture. */
let primed = false;

function synth(): SpeechSynthesis | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  return window.speechSynthesis;
}

function pickEnglishVoice(): SpeechSynthesisVoice | null {
  const engine = synth();
  if (!engine) return null;
  if (cachedVoice) return cachedVoice;
  const voices = engine.getVoices();
  if (!voices.length) return null;
  voicesReady = true;
  cachedVoice =
    voices.find((v) => /en[-_]US/i.test(v.lang) && v.localService) ??
    voices.find((v) => /en[-_]GB/i.test(v.lang)) ??
    voices.find((v) => /en[-_]US/i.test(v.lang)) ??
    voices.find((v) => /^en/i.test(v.lang)) ??
    null;
  return cachedVoice;
}

/** Start the engine once from a real gesture so iOS stops blocking it. */
function prime() {
  if (primed) return;
  const engine = synth();
  if (!engine) return;
  primed = true;
  try {
    const warmup = new SpeechSynthesisUtterance(" ");
    warmup.volume = 0;
    engine.speak(warmup);
    engine.cancel();
  } catch {
    // Priming is best-effort; playback below still tries on its own.
  }
}

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const watchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const engine = synth();
    setSupported(Boolean(engine) || typeof Audio !== "undefined");
    if (!engine) return;

    const warm = () => pickEnglishVoice();
    warm();
    engine.addEventListener("voiceschanged", warm);

    // The first touch/click anywhere unlocks audio for the rest of the session.
    const onGesture = () => prime();
    window.addEventListener("pointerdown", onGesture, { once: true, passive: true });
    window.addEventListener("touchend", onGesture, { once: true, passive: true });

    return () => {
      engine.removeEventListener("voiceschanged", warm);
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("touchend", onGesture);
      engine.cancel();
    };
  }, []);

  const clearWatchdog = useCallback(() => {
    if (watchdogRef.current) {
      clearTimeout(watchdogRef.current);
      watchdogRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    clearWatchdog();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    const engine = synth();
    if (engine && (engine.speaking || engine.pending)) engine.cancel();
    setSpeaking(false);
  }, [clearWatchdog]);

  /** Play a recorded pronunciation file. Resolves false if it cannot play. */
  const playAudio = useCallback((url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      try {
        const audio = new Audio(url);
        audio.preload = "auto";
        audioRef.current = audio;
        let settled = false;
        const done = (ok: boolean) => {
          if (settled) return;
          settled = true;
          resolve(ok);
        };
        audio.onplaying = () => done(true);
        audio.onended = () => setSpeaking(false);
        audio.onerror = () => {
          setSpeaking(false);
          done(false);
        };
        setSpeaking(true);
        void audio.play().catch(() => {
          setSpeaking(false);
          done(false);
        });
        // If nothing has started by now the file is not going to play.
        setTimeout(() => done(false), 1200);
      } catch {
        resolve(false);
      }
    });
  }, []);

  const speakSynth = useCallback(
    (text: string, rate = 0.9, onFail?: () => void) => {
      const engine = synth();
      if (!engine) {
        onFail?.();
        return;
      }

      // Anything in here can throw on a quirky mobile engine. A throw used to
      // mean total silence with no fallback, so the whole path is guarded and
      // any failure hands over to the recorded-audio rescue.
      try {
        prime();
        if (engine.speaking || engine.pending) engine.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = rate;
        utterance.volume = 1;

        const voice = pickEnglishVoice();
        if (voice) {
          try {
            utterance.voice = voice;
          } catch {
            // Stale or non-standard voice object — the default voice is fine.
            cachedVoice = null;
          }
        }

        let started = false;
        utterance.onstart = () => {
          started = true;
          clearWatchdog();
          setSpeaking(true);
        };
        utterance.onend = () => setSpeaking(false);
        utterance.onerror = () => {
          setSpeaking(false);
          if (!started) onFail?.();
        };

        setSpeaking(true);
        engine.speak(utterance);

        // Android Chrome can land in a paused state right after cancel().
        setTimeout(() => {
          try {
            if (engine.paused) engine.resume();
          } catch {
            /* not fatal */
          }
        }, 120);

        // If the engine never actually speaks, hand over to the fallback.
        clearWatchdog();
        watchdogRef.current = setTimeout(() => {
          if (!started) {
            setSpeaking(false);
            onFail?.();
          }
        }, 900);
      } catch {
        setSpeaking(false);
        onFail?.();
      }
    },
    [clearWatchdog],
  );

  /**
   * Speak `text`. If `audioUrl` is already known, the recording is preferred;
   * otherwise the synthesiser runs immediately and `getAudioUrl` (if given) is
   * used as a rescue when the synthesiser turns out to be silent.
   */
  const speak = useCallback(
    (
      text: string,
      audioUrl?: string | null,
      options?: { rate?: number; getAudioUrl?: () => Promise<string | null> },
    ) => {
      stop();
      const rate = options?.rate ?? 0.9;

      if (audioUrl) {
        void playAudio(audioUrl).then((ok) => {
          if (!ok) speakSynth(text, rate);
        });
        return;
      }

      speakSynth(text, rate, () => {
        // Synthesiser produced nothing — try to rescue with a real recording.
        void options?.getAudioUrl?.().then((url) => {
          if (url) void playAudio(url);
        });
      });
    },
    [playAudio, speakSynth, stop],
  );

  useEffect(() => () => clearWatchdog(), [clearWatchdog]);

  return { speak, stop, speaking, supported, voicesReady };
}
