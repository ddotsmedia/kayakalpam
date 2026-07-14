/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://kayakalpamvaidyasala.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
