"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { useEffect, useState } from "react";

export function ThemeProvider({ 
  children, 
  ...props 
}: 
ThemeProviderProps
) {
  // removes the Warning: Extra attributes from the server: class,style in the browser
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && <NextThemesProvider {...props}>{children}</NextThemesProvider>
  );
};
