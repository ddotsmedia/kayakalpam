/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://kayakalpamvaidyasala.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/admin", "/admin/*", "/api/*"],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/", disallow: ["/admin/", "/api/"] }],
  },
  transform: async (config, path) => {
    const priorities = {
      "/": 1.0,
      "/karkidaka": 1.0,
      "/telemedicine": 0.9,
      "/treatments": 0.9,
      "/visha-chikitsa": 0.9,
      "/conditions": 0.8,
      "/about": 0.8,
      "/contact": 0.8,
      "/blog": 0.7,
      "/gallery": 0.7,
      "/faq": 0.7,
      "/books": 0.6,
      "/prakriti": 0.5,
    };
    return {
      loc: path,
      changefreq: path.startsWith("/blog/") ? "monthly" : "weekly",
      priority: priorities[path] ?? (path.startsWith("/blog/") ? 0.7 : 0.6),
      lastmod: new Date().toISOString(),
    };
  },
};
