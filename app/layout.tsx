import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ExpoStudios - Crafting Digital Experiences",
  description: "We craft experiences people can feel and outcomes you can measure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}