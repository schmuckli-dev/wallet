/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js");

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "android-icon-144x144.png",
    "revision": "e4fa353ba84c730549c347e41010a3bb"
  },
  {
    "url": "android-icon-192x192.png",
    "revision": "4df4650c75cb615583479988fa9a1325"
  },
  {
    "url": "android-icon-36x36.png",
    "revision": "5169b0759667bfccff5cffcc99be2fdc"
  },
  {
    "url": "android-icon-48x48.png",
    "revision": "680e92d03ff0aa98c3a35ca75b397af4"
  },
  {
    "url": "android-icon-72x72.png",
    "revision": "90a1aaf883d4291b8e61c53514ba6b02"
  },
  {
    "url": "android-icon-96x96.png",
    "revision": "c3f5909704696fdf1372dc2833ec54a5"
  },
  {
    "url": "apple-icon-114x114.png",
    "revision": "c97a12496b47c804eeba8a53f29bc909"
  },
  {
    "url": "apple-icon-120x120.png",
    "revision": "19e4009f1d24720cbb63c9bb9599b2ff"
  },
  {
    "url": "apple-icon-144x144.png",
    "revision": "e4fa353ba84c730549c347e41010a3bb"
  },
  {
    "url": "apple-icon-152x152.png",
    "revision": "f035b7bdfe5043395edd218a4c89bb40"
  },
  {
    "url": "apple-icon-180x180.png",
    "revision": "264368d04e5e260e7c8549d87df26292"
  },
  {
    "url": "apple-icon-57x57.png",
    "revision": "97c2d6db5d6d7502827df1f57586b851"
  },
  {
    "url": "apple-icon-60x60.png",
    "revision": "14eee515377e7dbd5e77382bfba75032"
  },
  {
    "url": "apple-icon-72x72.png",
    "revision": "90a1aaf883d4291b8e61c53514ba6b02"
  },
  {
    "url": "apple-icon-76x76.png",
    "revision": "2665a30f11a1fa833bbfbfa38b565bc4"
  },
  {
    "url": "apple-icon-precomposed.png",
    "revision": "cbfd332d85a38859cf7d84a3d88dc9f8"
  },
  {
    "url": "apple-icon.png",
    "revision": "cbfd332d85a38859cf7d84a3d88dc9f8"
  },
  {
    "url": "favicon-16x16.png",
    "revision": "fc74e22566ea2588cd1a2cee53477a2c"
  },
  {
    "url": "favicon-32x32.png",
    "revision": "d70793010b00c954f12d732542cd8056"
  },
  {
    "url": "favicon-96x96.png",
    "revision": "c3f5909704696fdf1372dc2833ec54a5"
  },
  {
    "url": "favicon.ico",
    "revision": "fdc9de0dd0c1696f80612e3e3bf5ccf3"
  },
  {
    "url": "index.html",
    "revision": "915ffc0366e34126c4222b5117b9e404"
  },
  {
    "url": "manifest.json",
    "revision": "555c34efe927e409d22b8bd6acd483ee"
  },
  {
    "url": "ms-icon-144x144.png",
    "revision": "e4fa353ba84c730549c347e41010a3bb"
  },
  {
    "url": "ms-icon-150x150.png",
    "revision": "dbaec92cb6718a024674b81c14c37444"
  },
  {
    "url": "ms-icon-310x310.png",
    "revision": "c78fff91e3b610e5827aeef7b5d0fc1d"
  },
  {
    "url": "ms-icon-70x70.png",
    "revision": "15356f0d7c1c7ce1af0ea268a346a16f"
  },
  {
    "url": "/hoodie/client.js",
    "revision": "58d56aa9048b355d31e3c3e6f5d64e83"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
