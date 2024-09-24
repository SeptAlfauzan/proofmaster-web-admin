import { ChakraProvider } from "@chakra-ui/react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Proof Master",
  description: "Proof master dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider> {children} </ChakraProvider>
      </body>
    </html>
  );
}
