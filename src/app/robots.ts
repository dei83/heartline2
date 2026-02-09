import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/dashboard/', '/contacts/', '/api/', '/admin/'],
        },
        sitemap: 'https://heartline.app/sitemap.xml',
    };
}
