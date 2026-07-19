import Footer from "@/landing/footer";
import GetStarted from "@/landing/get-started";
import Header from "@/landing/header";
import HeroSection from "@/landing/hero";

export default function LandingPage() {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="absolute inset-0 -z-10
          bg-white
          dark:bg-[#0a0a0a]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      <div
        className="absolute inset-0 -z-10 hidden dark:block"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #222222 0.5px, transparent 1px),
            radial-gradient(circle at 75% 75%, #111111 0.5px, transparent 1px)
          `,
          backgroundSize: "10px 10px",
          imageRendering: "pixelated",
        }}
      />

      <Header />

      <main className="flex min-h-screen w-full flex-col items-center justify-center">
        <HeroSection />
        <GetStarted />
        <Footer />
      </main>
    </div>
  );
}