"use client";

import type { ComponentPropsWithoutRef } from "react";
import { navigateToSection } from "@/lib/navigation";

// Keep in-page navigation usable after a keyboard selection.
export function SectionLink({ href = "#", onClick, ...props }: ComponentPropsWithoutRef<"a">) {
  return <a {...props} href={href} onClick={event => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !href.startsWith("#")) return;
    event.preventDefault();
    navigateToSection(href.slice(1));
  }} />;
}
