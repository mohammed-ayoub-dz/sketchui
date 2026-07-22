"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import DrawingCanvas from "@/components/app/draw-board";
import { Brush, Eraser, Trash, Undo2 } from "lucide-react";
import { AiInput } from "@/components/app/ai-input";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function App() {
  const [tool, setTool] = useState<"brush" | "eraser">("brush");
  const [color, setColor] = useState("#000000");
  const [clearTrigger, setClearTrigger] = useState(0);
  const [undoTrigger, setUndoTrigger] = useState(0);
  const { data: session, isPending } = authClient.useSession();

  const handleClear = () => {
    setClearTrigger((prev) => prev + 1);
  };

  const handleUndo = () => {
    setUndoTrigger((prev) => prev + 1);
  };

  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const handleSignOut = async () => {
    await authClient.signOut();
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

  const tools = [
    {
      id: "brush",
      icon: Brush,
      label: "Brush",
      onClick: () => setTool("brush"),
    },
    {
      id: "color",
      label: "Color",
      render: () => (
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black">
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
    },
    {
      id: "eraser",
      icon: Eraser,
      label: "Eraser",
      onClick: () => setTool("eraser"),
    },
    {
      id: "undo",
      icon: Undo2,
      label: "Undo (Ctrl+Z)",
      onClick: handleUndo,
    },
    {
      id: "clear",
      icon: Trash,
      label: "Clear",
      onClick: handleClear,
    },
  ];

  return (
    <div className="h-screen w-full relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: '#0a0a0a',
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #222222 0.5px, transparent 1px),
            radial-gradient(circle at 75% 75%, #111111 0.5px, transparent 1px)
          `,
          backgroundSize: '10px 10px',
          imageRendering: 'pixelated',
        }}
      />

      <div className="absolute inset-0 z-1">
        <DrawingCanvas
          tool={tool}
          color={color}
          clearTrigger={clearTrigger}
          undoTrigger={undoTrigger}
        />
      </div>

      <div className="absolute top-4 right-4 z-20">
        {isPending ? (
          <Button disabled>Loading...</Button>
        ) : session ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 outline-none hover:opacity-80 transition-opacity">
                  <Image
                    src={session.user.image || ""}
                    alt={session.user.name || "User profile"}
                    fill
                    sizes="40px"
                    className="object-cover"
                    unoptimized
                  />
                </button>
              }
            />
            <DropdownMenuContent align="end" className="w-full p-3">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session.user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>App</DropdownMenuItem>
              <DropdownMenuItem>Usage</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-destructive focus:text-destructive"
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={handleSignIn}>Get started</Button>
        )}
      </div>

      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4 p-3 rounded-2xl bg-black/60 backdrop-blur-sm border border-white/10 shadow-lg">
        {tools.map((item) => (
          <div key={item.id} className="relative group">
            {item.render ? (
              item.render()
            ) : (
              <button
                onClick={item.onClick}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                title={item.label}
              >
                {item.icon && <item.icon className="w-5 h-5" />}
              </button>
            )}
            <span className="absolute left-full ml-2 px-2 py-1 rounded-md bg-black/80 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-2xl">
        <AiInput />
      </div>
    </div>
  );
}