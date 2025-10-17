export interface Product {
  title: string;
  href: string;
  description: string;
  openSource?: boolean;
}

export const products: Product[] = [
  {
    title: "Big Journal",
    href: "https://bigjournal.app",
    description: "Beautiful, AI-powered journaling.",
  },
  {
    title: "Feedback",
    href: "https://github.com/jamiedavenport/feedback",
    description: "Headless customer feedback platform.",
    openSource: true,
  },
  {
    title: "Forgotten",
    href: "https://forgotten.app",
    description: "Bookmark manager for developers.",
  },
  {
    title: "Gotowy",
    href: "https://gotowy.jxd.dev",
    description: "AI-native, minimalist task management.",
  },
  {
    title: "Hype",
    href: "https://buildhype.dev",
    description: "Open-source toolkit for building waitlists.",
    openSource: true,
  },
  {
    title: "Starter",
    href: "https://github.com/jxdltd/holistic-starter",
    description: "TanStack-based starter kit for building web apps at speed.",
    openSource: true,
  },
  {
    title: "Quadratic",
    href: "https://github.com/jxdltd/quadratic-v2",
    description: "Feedback widget built for Linear.",
    openSource: true,
  },
];
