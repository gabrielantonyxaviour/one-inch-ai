"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();
  const [selected, setSelected] = useState(0);
  return (
    <nav
      className={cn(
        "flex space-x-2 flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            item.href == pathname
              ? "hover:bg-primary bg-primary text-black hover:text-black"
              : "",
            "justify-start hover:translate-x-1 transition-transform"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
