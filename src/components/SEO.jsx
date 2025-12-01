import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title} | Galaktik Websites</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta property="og:title" content={`${title} | Galaktik Websites`} />
            <meta property="og:description" content={description} />
            <meta name="twitter:title" content={`${title} | Galaktik Websites`} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
};

export default SEO;
