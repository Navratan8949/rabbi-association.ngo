export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rabbiassociation.org'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/member/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
