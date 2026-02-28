import "./globals.css";
import { Poppins, Roboto, Dancing_Script } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-poppins",
})

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-roboto",
})

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cursive",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${roboto.variable} ${dancingScript.variable}`}>
      <body className="antialiased">
        <div className="grainy-overlay"></div>
        {children}
      </body>
    </html>
  );
}