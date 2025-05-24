"use client";

import LogoIcon from "./logo";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ConnectWalletButton } from "./connect-wallet-button";
import Link from "next/link";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "/leaderboard",
    label: "Leaderboard",
  },
  {
    href: "/dashboard",
    label: "DEX",
  },
  {
    href: "/staking",
    label: "Staking",
  },
  {
    href: "/lending",
    label: "Lending",
  },
  {
    href: "/landing",
    label: "Landing",
  },
  {
    href: "/leaderboard",
    label: "Leaderboard",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full flex border-b-slate-700 bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container w-[calc(100vw_-_16px)] h-14 px-4 flex justify-between md:grid md:grid-cols-[auto_1fr_200px] gap-2 justify-items-center">
          <NavigationMenuItem className="font-bold flex ">
            <Link href="/" className="ml-2 font-bold text-xl flex items-center">
              <LogoIcon className="size-10 mr-2 fill-white" />
              SandboxFi
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                />
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    SandboxFi
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </Link>
                  ))}
                  <ConnectWalletButton />
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <Link
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            <ConnectWalletButton />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
