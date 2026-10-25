import type { ReactNode } from "react";

type Tone = "rose" | "white" | "tan";

interface SectionCardProps {
  children: ReactNode;
  tone: Tone;
  className?: string;
}

const toneClasses: Record<Tone, string> = {
  rose: "bg-[#d6c1cb] bg-opacity-50",
  white: "bg-white bg-opacity-50",
  tan: "bg-[#e2c7a7] bg-opacity-50",
};

const SectionCard = ({ children, tone, className = "" }: SectionCardProps) => (
  <section
    className={`scroll-reactive-surface text-left mt-10 mb-16 pt-8 pb-8 px-10 max-w-4xl mx-auto shadow-md rounded-md ${toneClasses[tone]} dark:bg-[#4b4b4b] dark:bg-opacity-50 dark:shadow-gray-950 ${className}`}
  >
    {children}
  </section>
);

export default SectionCard;
