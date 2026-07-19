"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
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

export default function Header() {
  const { data: session, isPending } = authClient.useSession();

  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div className="w-full flex justify-between items-center flex-row p-4">
      <h1 className="text-2xl font-bold">
        SketchUI
      </h1>

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
            <DropdownMenuItem>
              app
            </DropdownMenuItem>
            <DropdownMenuItem>
              Usage
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={handleSignIn}>
          Get started
        </Button>
      )}
    </div>
  );
}