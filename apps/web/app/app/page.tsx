"use client";

import { useState, useEffect } from "react";
import DrawingCanvas from "@/components/app/draw-board";
import { GlassDock } from "@/components/ui/glass-dock";
import { Brush, Eraser, Trash, Undo2 } from "lucide-react";

export default function App() {
  const [tool, setTool] = useState<"brush" | "eraser">("brush");
  const [color, setColor] = useState("#000000");
  const [clearTrigger, setClearTrigger] = useState(0);
  const [undoTrigger, setUndoTrigger] = useState(0);

  const handleClear = () => {
    setClearTrigger((prev) => prev + 1);
  };

  const handleUndo = () => {
    setUndoTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        handleUndo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="h-screen flex justify-between items-center flex-col p-5 bg-white dark:bg-black transition-colors duration-300">
      <div className="w-full flex-1 flex items-center justify-center">
        <DrawingCanvas tool={tool} color={color} clearTrigger={clearTrigger} undoTrigger={undoTrigger} />
      </div>

      <div className="pb-4">
        <GlassDock
          items={[
            { 
              icon: Brush, 
              title: "Brush", 
              href: "#",
              onClick: () => setTool("brush"),
              className: tool === "brush" ? "bg-primary/10 text-primary" : ""
            },
            {
              icon: () => (
                <div className="relative flex items-center justify-center w-6 h-6 rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-700">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => {
                      setColor(e.target.value);
                      setTool("brush");
                    }}
                    className="absolute w-[150%] h-[150%] p-0 m-0 border-none cursor-pointer scale-150"
                  />
                </div>
              ),
              title: "Color",
              href: "#"
            },
            { 
              icon: Eraser, 
              title: "Eraser", 
              href: "#",
              onClick: () => setTool("eraser"),
              className: tool === "eraser" ? "bg-primary/10 text-primary" : ""
            },
            { 
              icon: Undo2, 
              title: "Undo (Ctrl+Z)", 
              href: "#",
              onClick: handleUndo 
            },
            { 
              icon: Trash, 
              title: "Clear", 
              href: "#",
              onClick: handleClear 
            },
          ]}
        />
      </div>
    </div>
  );
}