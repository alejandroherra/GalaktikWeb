import { memo } from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = memo(({ title, description, keywords, canonical, lang = 'es' }) => {
    const fullTitle = `${title} | Galaktik`;
    const siteUrl = 'https://galaktikweb.com';
    const canonicalUrl = canonical ? `${siteUrl}${canonical}` : undefined;

    return (
        <Helmet>
            <html lang={lang} />
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="robots" content="index, follow" />
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content="Galaktik" />
            <meta property="og:locale" content={lang === 'es' ? 'es_CR' : 'en_US'} />
            {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
});

SEO.displayName = 'SEO';

export default SEO;
