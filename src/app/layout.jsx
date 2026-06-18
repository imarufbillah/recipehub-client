import { Bodoni_Moda, Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/providers/ThemeProvider";

const displaySerif = Bodoni_Moda({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RecipeHub — Recipe Sharing Platform",
  description: "RecipeHub is a recipe sharing platform for food enthusiasts.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${displaySerif.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
