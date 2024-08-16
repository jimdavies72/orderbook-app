import type { Metadata } from "next";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ThemeProvider } from "@/components/lightDark/theme-provider";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orderbook",
  description: "Weir & Carmichael Orderbook App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col items-center">
              <div className="w-[90%]">
                <div className="flex justify-center">
                  <Navbar />
                </div>
                {children}
                <Toaster />
              </div>
            </div>
          </ThemeProvider>
        </body>
      </UserProvider>
    </html>
  );
}
