"use client";

import React from "react";
import { Button } from "./ui/button";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useStoreUser } from "../hooks/use-store-user";
import { BarLoader } from "react-spinners";
import { Authenticated, Unauthenticated } from "convex/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const { isLoading } = useStoreUser();
  const path = usePathname();

  return (
    <header className="fixed top-0 w-full border-b-4 border-black bg-[#FFF1E8] z-50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-[#FFDC02] px-3 py-1.5 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
            <Image
              src={"/logos/logo.png"}
              alt="Vehiql Logo"
              width={140}
              height={40}
              className="h-8 w-auto object-contain"
            />
          </div>
        </Link>

        {path === "/" && (
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="#features"
              className="px-4 py-2 text-sm font-bold border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="px-4 py-2 text-sm font-bold border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              How It Works
            </Link>
          </div>
        )}

        <div className="flex items-center gap-4">
          <Authenticated>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-bold border-4 border-black bg-[#7189FF] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all hover:bg-[#7189FF]"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className="md:hidden w-10 h-10 p-0 border-4 border-black bg-[#7189FF] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>

            <div className="flex items-center justify-center w-12 h-12 border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 rounded-full",
                    userButtonPopoverCard: "shadow-xl border-4 border-black bg-[#FFF1E8]",
                    userPreviewMainIdentifier: "font-bold",
                    userButtonAvatarBox: "w-10 h-10 rounded-full",
                  },
                }}
                afterSignOutUrl="/"
              />
            </div>
          </Authenticated>

          <Unauthenticated>
            <SignInButton>
              <Button 
                variant="ghost" 
                className="px-4 py-2 text-sm font-bold border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton>
              <Button className="px-4 py-2 text-sm font-bold border-4 border-black bg-[#FFDC02] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                Get Started
              </Button>
            </SignUpButton>
          </Unauthenticated>
        </div>
      </nav>
      {isLoading && (
        <div className="absolute bottom-0 left-0 right-0">
          <BarLoader width={"100%"} color="#6CBD45" height={6} />
        </div>
      )}
    </header>
  );
}