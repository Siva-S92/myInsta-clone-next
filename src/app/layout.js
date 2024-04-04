import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SessionWrapper from "@/components/Session_Wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Insta Clone",
  description: "A clone of Instagram built by create next app",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <Header />

          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
