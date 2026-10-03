import { Metadata } from "next";
import { SITE_CONFIG } from "./constants";

export function constructMetadata({
  title = `${SITE_CONFIG.name} | ${SITE_CONFIG.shortTitle}`,
  description = SITE_CONFIG.bio,
  image = "/images/og/portfolio-og.png",
  noIndex = false
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    metadataBase: new URL(SITE_CONFIG.siteUrl),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: SITE_CONFIG.siteUrl,
      title,
      description,
      siteName: `${SITE_CONFIG.name} Portfolio`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.name} - ${SITE_CONFIG.shortTitle}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@prasoonsoni"
    },
    robots: {
      index: !noIndex,
      follow: !noIndex
    }
  };
}
