import { MorphText } from "@/components/ui/morph-text";

export default function HeroSection() {
  return (
    <section className="flex h-[calc(100vh-64px)] w-full items-center justify-center">
      <MorphText
        words={["DRAW", "GENERATE", "SHIP"]}
        interval={3000}
        subtext="From sketch to production-ready React."
        fontSize="clamp(2rem, 10vw, 8rem)"
      />
    </section>
  );
}