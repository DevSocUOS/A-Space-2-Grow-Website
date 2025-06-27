import React from "react";
import { Helmet } from "react-helmet-async";
import { daisiesGarden } from "../assets";

export default function Seo({
  title,
  description = "Get to know the dedicated team behind A Space 2 Grow, committed to community gardening and wellbeing.",
  keywords = 'charity, garden, sunderland, participate, AS2G, A Space 2 Grow, community, wellbeing, collaboration, sustainability',
  path = "",
  image = daisiesGarden,
  children,

}) {
  const siteName = "A Space 2 Grow";
  const url = `http://localhost:5173${path}`;

  return (
    <Helmet>
      {/* Title */}
      <title>{title} | {siteName}</title>
      <meta property="og:title" content={`${title} | ${siteName}`} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical */}
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />

      {/* Apple Web App Meta */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteName} />

      {/* Language & Direction */}
      <html lang="en" dir="ltr" />
      <meta name="language" content="English" />

      {/* Conditional comments for IE */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      {/* Social: Facebook Open Graph */}
      <meta property="og:title" content={`${title} | ${siteName}`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}

      {/* Social: Twitter Card */}
      <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={`${title} | ${siteName}`} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* General Meta */}
      <meta name="robots" content="index, follow" />
      <meta name="revisit-after" content="30 days" />
      <meta name="author" content="The Developer Society" />
      <meta name="msapplication-TileColor" content="#ffffff" />

      {children}
    </Helmet>
  );
}
