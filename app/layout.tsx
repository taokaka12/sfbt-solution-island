import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import "./hub.css";

const fallbackOrigin = "https://solution-island-sfbt-100.tao-kaka.chatgpt.site";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host");
  const host = (forwardedHost ?? requestHeaders.get("host") ?? "")
    .split(",")[0]
    .trim();
  const forwardedProto = requestHeaders.get("x-forwarded-proto");
  const protocol = forwardedProto?.split(",")[0].trim() === "http" ? "http" : "https";

  let origin = fallbackOrigin;
  if (host) {
    try {
      origin = new URL(protocol + "://" + host).origin;
    } catch {
      origin = fallbackOrigin;
    }
  }

  const socialImage = origin + "/og.png";

  return {
    title: {
      default: "陶教授学习训练中心",
      template: "%s | 陶教授学习训练中心",
    },
    description: "互动学习模块：财富大脑训练营与 SFBT Solution Island。",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "陶教授学习训练中心",
      description: "财富大脑训练营与 SFBT Solution Island，两套互动学习旅程。",
      images: [{ url: socialImage, width: 1536, height: 1024, alt: "陶教授学习训练中心" }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "陶教授学习训练中心",
      description: "财富大脑训练营与 SFBT Solution Island，两套互动学习旅程。",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

