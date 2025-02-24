"use client";
import { Noto_Serif } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./store";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSerif.variable} antialiased`}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
