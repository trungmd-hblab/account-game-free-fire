import "@mantine/carousel/styles.css";
import "@mantine/core/styles.css";
import "@mantine/core/styles/global.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import { Roboto } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>
          Supitv - Shop Chuyên Nick Free Fire - Random Kim Cương - Uy Tín - Chất Lượng
        </title>
        <meta
          name="description"
          content="Supitv.com - Shop Chuyên Nick Free Fire - Random Kim Cương - Uy Tín - Chất Lượng - Giá Rẻ Cho Học Sinh, Sinh Viên, Game Thủ Free Fire - Hỗ trợ khách hàng 24/24."
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Supitv - Shop Chuyên Nick Free Fire - Random Kim Cương - Uy Tín - Chất Lượng"
        />
        <meta
          property="og:description"
          content="Supitv.com - Shop Chuyên Nick Free Fire - Random Kim Cương - Uy Tín - Chất Lượng - Giá Rẻ Cho Học Sinh, Sinh Viên, Game Thủ Free Fire - Hỗ trợ khách hàng 24/24."
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content="/uploads/1769965912_logosupitv.png"
        />
        <meta property="og:url" content="https://Supitv.com" />
        <meta name="keywords" content="" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/uploads/1722859737favicon.ico.jpg"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/uploads/1722859737favicon.ico.jpg"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/uploads/1722859737favicon.ico.jpg"
        />
      </head>

      <body className={`${roboto.className} bg-[#f7f7f7]`}>{children}</body>
    </html>
  );
}
