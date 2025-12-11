import { Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";

const zenMaru = Zen_Maru_Gothic({
  weight: ["500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-zen-maru",
  display: "swap",
});

export const metadata = {
  title: "亜寝帯 - ANETTAI | Cyber Tropical Dream",
  description: "おいものポートフォリオサイト。Y2K × Frutiger Aeroの世界観。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={`${zenMaru.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
