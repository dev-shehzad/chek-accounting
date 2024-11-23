import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import Header from "@/components/homepage/header/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "shipleap.com",
  description: "Shipleap Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Header/>

        {children}

      <Footer/>
      </body>
    </html>
  );
}
