"use client";

import { LiquidMetalButton } from "@/components/ui/liquid-metal";
import { ArrowRight } from "lucide-react";
import { signIn } from "@/lib/auth-client";

export default function GetStarted() {

  return (
    <div className=" flex justify-center items-center flex-col ">

      <h1 className="text-4xl font-bold mb-4">
        It's free
      </h1>

      <h1 className=" text-1xl  mb-5">
        Powered by AI
      </h1>
      <LiquidMetalButton
        onClick={signIn}
          icon={<ArrowRight className="w-5 h-5" />}
          metalConfig={{
            colorBack: "#3b82f6",
            colorTint: "#93c5fd",
          }}
        >
          Create my first component
        </LiquidMetalButton>
    </div>
  )
}
