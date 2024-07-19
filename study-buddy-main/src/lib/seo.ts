import { env } from "@/env";
import { Metadata } from "next";

const siteConfig = {
  defaultTitle: "Study buddy",
  defaultDescription:
    "A Study app designed to help students keep track of their assignments and projects",
  baseUrl: env.NEXT_PUBLIC_SITE_URL,
};

/**
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */

export default function getMetadata(overrides: Partial<Metadata>): Metadata {
  return {
    metadataBase: new URL(siteConfig.baseUrl),
    title: {
      default: siteConfig.defaultTitle,
      template: "Study buddy | %s",
    },
    description: siteConfig.defaultDescription,
    // openGraph: {
    //   url: siteConfig.baseUrl,
    //   title: siteConfig.defaultTitle,
    //   description: siteConfig.defaultDescription,
    //   siteName: siteConfig.defaultTitle,
    //   images: "/images/og.png",
    //   type: "website",
    //   locale: "en_US",
    // },
    // twitter: {
    //   card: "summary_large_image",
    //   title: siteConfig.defaultTitle,
    //   description: siteConfig.defaultDescription,
    //   images: "/images/og.png",
    // },
    ...overrides,
  };
}
