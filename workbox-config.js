module.exports = {
  globDirectory: "dist/",
  globPatterns: ["**/*.{css,ico,html,png,js,json,woff2}"],
  swDest: "./dist/service-worker.js",
  maximumFileSizeToCacheInBytes: 10000000,
  skipWaiting: true,
  clientsClaim: true,
  templatedUrls: {
    "/hoodie/client.js": ".hoodie/client.js"
  }
};
