"use client";

import { SelectAIAgent } from "../ui/select-ai-agent";

export const AiInput = () => {
  return (
    <div className="w-full h-full rounded-lg">
      <div className="h-full  relative flex justify-center items-center flex-col w-full">
       
      <SelectAIAgent />
      </div>
    </div>
  )
}