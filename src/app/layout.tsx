import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300","400", "500", "600", "700","800"],
  });

export const metadata: Metadata = {
  title: "Threads Clone",
  description: "This is The Thang's project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.className} antialiased bg-background`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />  
      </body>
    </html>
  );
}
