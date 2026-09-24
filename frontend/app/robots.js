export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rabbi.co.in'

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
