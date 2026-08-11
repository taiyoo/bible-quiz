import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrueVine Quiz & Assessments",
  description: "Bible quiz and spiritual assessments for TrueVine Church, powered by HoloCare.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}