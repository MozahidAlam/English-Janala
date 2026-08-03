import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "English জানালা — Grammar ও Vocabulary",
    short_name: "English জানালা",
    description:
      "বাংলায় ব্যাখ্যা সহ সম্পূর্ণ English Grammar, SRS ভোকাবুলারি, ফ্রি গ্রামার চেকার আর মিনি-গেম।",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#fffaf0",
    theme_color: "#1a91ff",
    lang: "bn",
    categories: ["education", "books"],
    icons: [
      { src: "/assets/logo.png", sizes: "any", type: "image/png", purpose: "any" },
    ],
    shortcuts: [
      { name: "Grammar", url: "/grammar", description: "গ্রামার লেসন" },
      { name: "Flashcards", url: "/flashcards", description: "শব্দ চর্চা" },
      { name: "Grammar Guru", url: "/guru", description: "লেখা চেক করুন" },
    ],
  };
}
