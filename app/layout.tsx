import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://quiz.tvcsydney.com"),
  title: "TrueVine Quiz & Assessments",
  description: "Bible quiz and spiritual assessments for TrueVine Church, powered by HoloCare.",
  openGraph: {
    title: "TrueVine Quiz & Assessments",
    description: "Bible quiz and spiritual assessments for TrueVine Church, powered by HoloCare.",
    images: ["/truevine-logo.jpg"],
  },
  twitter: {
    card: "summary",
    title: "TrueVine Quiz & Assessments",
    description: "Bible quiz and spiritual assessments for TrueVine Church, powered by HoloCare.",
    images: ["/truevine-logo.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}