"use client";

import { HeaderLogo, LogoWrapper } from "@/components/globle/logo-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { links, NavigationDesktop } from "./navigation";
import { useState } from "react";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { NonBodyAsScript } from "./server-com";
import { cachedScriptData } from "@/lib/fetch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [script, setScript] = useState<string | undefined>("");

  cachedScriptData().then((res) => {
    const data = res.data?.headerCode;

    setScript(data);
  });

  return (
    <>
      <Card className="p-0 m-4">
        <CardContent className="p-0">
          {/* Desktop header */}
          <header className="px-7 py-2 items-center justify-start gap-6 hidden sm:flex">
            <div>
              <LogoWrapper>
                <HeaderLogo />
              </LogoWrapper>
            </div>

            <div className="w-fit h-fit">
              <NavigationDesktop />
            </div>
          </header>

          {/* Mobile header */}
          <header className="px-7 py-2 flex items-center gap-6 sm:hidden">
            <div
              onClick={() => {
                setIsMenuOpen(true);
              }}
            >
              <Menu className="size-5" />
            </div>

            <div>
              <LogoWrapper>
                <HeaderLogo />
              </LogoWrapper>
            </div>
          </header>
        </CardContent>
      </Card>

      <Sheet onOpenChange={setIsMenuOpen} open={isMenuOpen}>
        <SheetContent side="left">
          <SheetTitle className="hidden">Title</SheetTitle>
          <SheetHeader>
            <div>
              <LogoWrapper>
                <HeaderLogo />
              </LogoWrapper>
            </div>
          </SheetHeader>
          <div>
            <Accordion type="single" collapsible className="w-full">
              {links.map((link, i) => {
                return (
                  <AccordionItem key={i} value={JSON.stringify(i)}>
                    <AccordionTrigger className="text-xl tracking-widest">
                      {link.social}
                    </AccordionTrigger>

                    <AccordionContent>
                      <ul>
                        {link.paths.map((path, i) => {
                          return (
                            <li key={i}>
                              <Link
                                href={path.path}
                                className="p-3 text-lg hover:bg-accent space-y-2 tracking-wider"
                              >
                                {path.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </SheetContent>
      </Sheet>

      <NonBodyAsScript script={script} />
    </>
  );
}
