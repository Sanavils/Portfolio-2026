import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export default function SEO({
  title = 'Hassen Arkab — UX/UI Designer Portfolio',
  description = 'Portfolio de Hassen Arkab, UX/UI Designer basé à Paris. Interfaces digitales, branding, design systems, expériences interactives et projets créatifs.',
  canonical = 'https://www.hassenarkab.com/',
  image = 'https://www.hassenarkab.com/og-image.jpg',
  type = 'website',
  noindex = false,
  schema = null,
}) {
  const { language } = useLanguage();

  return (
    <Helmet>
      {/* HTML Language */}
      <html lang={language || 'en'} />

      {/* Document Title */}
      <title>{title}</title>

      {/* Primary Meta Tags */}
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Robots Directive */}
      <meta
        name="robots"
        content={noindex ? 'noindex, nofollow' : 'index, follow'}
      />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Hassen Arkab" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
