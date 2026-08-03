"use client";

/**
 * Pronunciation playback.
 *
 * Prefers a real human recording from dictionaryapi.dev; falls back to the
 * browser speech synthesiser, picking an English voice where one exists so it
 * doesn't read English words with a local-language accent.
 */
import { useCallback, useEffect, useRef, useState } from "react";

let cachedVoice: SpeechSynthesisVoice | null = null;

function pickEnglishVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  if (cachedVoice) return cachedVoice;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const preferred =
    voices.find((v) => /en[-_]GB/i.test(v.lang) && /female|zira|hazel/i.test(v.name)) ??
    voices.find((v) => /en[-_]US/i.test(v.lang)) ??
    voices.find((v) => /^en/i.test(v.lang)) ??
    null;
  cachedVoice = preferred;
  return preferred;
}

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const hasTts = typeof window !== "undefined" && "speechSynthesis" in window;
    setSupported(hasTts);
    if (!hasTts) return;
    // Voice list loads asynchronously in most browsers.
    const warm = () => pickEnglishVoice();
    warm();
    window.speechSynthesis.addEventListener("voiceschanged", warm);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", warm);
      window.speechSynthesis.cancel();
    };
  }, []);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    audioRef.current = null;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  }, []);

  const speakSynth = useCallback((text: string, rate = 0.92) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = rate;
    const voice = pickEnglishVoice();
    if (voice) utterance.voice = voice;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }, []);

  /** Play `audioUrl` if given, otherwise synthesise `text`. */
  const speak = useCallback(
    (text: string, audioUrl?: string | null, rate = 0.92) => {
      stop();
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        audio.onended = () => setSpeaking(false);
        audio.onerror = () => speakSynth(text, rate);
        setSpeaking(true);
        void audio.play().catch(() => speakSynth(text, rate));
        return;
      }
      speakSynth(text, rate);
    },
    [speakSynth, stop],
  );

  return { speak, stop, speaking, supported };
}
