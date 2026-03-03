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
          Hungakirashopff - Shop Chuyên Nick Free Fire - Random Kim Cương - Uy Tín - Chất Lượng
        </title>
        <meta
          name="description"
          content="Hungakirashopff.com - Shop Chuyên Nick Free Fire - Random Kim Cương - Uy Tín - Chất Lượng - Giá Rẻ Cho Học Sinh, Sinh Viên, Game Thủ Free Fire - Hỗ trợ khách hàng 24/24."
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Hungakirashopff - Shop Chuyên Nick Free Fire - Random Kim Cương - Uy Tín - Chất Lượng"
        />
        <meta
          property="og:description"
          content="Hungakirashopff.com - Shop Chuyên Nick Free Fire - Random Kim Cương - Uy Tín - Chất Lượng - Giá Rẻ Cho Học Sinh, Sinh Viên, Game Thủ Free Fire - Hỗ trợ khách hàng 24/24."
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content="/uploads/1769965912_logoHungakirashopff.png"
        />
        <meta property="og:url" content="https://Hungakirashopff.com" />
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
        
        {/* Meta Pixel Code */}
        <script dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1988515165209999');
            fbq('track', 'PageView');
          `
        }} />
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=1988515165209999&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>

      <body className={`${roboto.className} bg-[#f7f7f7]`}>{children}</body>
    </html>
  );
}
