if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>a(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(n(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"88683369187a63ffa458d75b06a6f702"},{url:"/_next/static/MNsJLNCe8WSL9UYCyW34k/_buildManifest.js",revision:"eefe8a07b9fca22e9989808b89af8a45"},{url:"/_next/static/MNsJLNCe8WSL9UYCyW34k/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1374-d537c8b328945c91.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/231-646cb8b768f25129.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/2967-f876e6cf6e2efc79.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/3006-405d9c4b0b629f6a.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/3889-ef58c18882b91cd6.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/4530-c002e062316c6afc.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/5987-8006cab8ae7607fa.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/6648-51513a9a548c0a80.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/7023-54e1055b332fb40a.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/8174-68b39953cd68c553.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/ViewAllBookings/page-cf4a5816b6446a0d.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/_not-found/page-0927e34f3ad5c7cf.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/about/page-23ab39bd71b5f8e6.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/admin/ViewAllBookings/page-4d126869e73d2bf0.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/admin/ViewAllRiders/page-c50f693cd74b9caa.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/admin/ViewAllUsers/page-805cea470619bc29.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/admin/bookings/page-70121ae2e4decee2.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/admin/bookings/user/%5BuserId%5D/page-48f9ad69b9a34baa.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/admin/coupons/page-db1de48bd3afbe4e.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/admin/dashboard/page-b358734e38d5188d.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/admin/edit-coupon/%5Bid%5D/page-9828b6d15a868d17.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/admin/layout-3e90ae7a2ccedb95.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/admin/riders/page-09a7a084347a80d5.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/admin/shipments/page-2888ed24c42d56c9.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/admin/update-status/page-5ec09b208a820c84.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/admin/users/page-d036e7eebc964c55.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/auth/error/page-af442bbc7d35bdca.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/auth/signin/page-5f40bf1bd87bb6f3.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/auth/signup/page-06202ff5b63b954a.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/booking-guide/page-57ecf77ab1a7bbdc.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/booking/confirmation/%5Bid%5D/page-f7fcf8aae7d17980.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/booking/page-06b3ebb2b98c756f.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/carpooling-directory/page-2118938b9275269d.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/contact-us/page-f883b83d3a2b57be.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/food-vendor-directory/page-1f59ab4e9186c43a.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/layout-442125a0784ade08.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/not-found-b115522d5e6bbc08.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/offline/page-359fba31752d646f.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/page-31630edfcb8cda2d.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/plugs/page-dfeddb777eb2bcc7.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/privacy/page-db6c0bf7e0a8832e.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/profile/edit/page-0f7f7c1fdc85d993.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/profile/page-79fae5959d38f876.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/restricted/page-c72815da965678a1.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/rider/dashboard/page-fd84229b60bd6825.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/rider/dashboard/task/page-5151df2a075c729d.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/rider/page-851b400cdbe089b3.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/services/page-9dd210987dd78b0e.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/state/page-cd6482e639be1910.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/terms/page-65f4bda62275bce8.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/tracking/page-3f32e6f560c7a8be.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/users/%5Bid%5D/page-3ad849cafcbd72b5.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/users/edit/%5Bid%5D/page-b01ce5c808ec7119.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/app/users/page-d6047ced2b2da5e3.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/b1644e8c-d0525fa3e847d976.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/fd9d1056-b4d0727544bef608.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/framework-8e0e0f4a6b83a956.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/main-60021e1edef15d1d.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/main-app-d5d9f74a6f4699fe.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/pages/_app-f870474a17b7f2fd.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/pages/_error-bb59299972f8c933.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-708335d182763521.js",revision:"MNsJLNCe8WSL9UYCyW34k"},{url:"/_next/static/css/2c7f362bb8ce8b85.css",revision:"2c7f362bb8ce8b85"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/android-chrome-192x192.png",revision:"b789e2d7286865867dfee313498d09bd"},{url:"/android-chrome-512x512.png",revision:"b679ef4a8b3bc3fe686c56543d8e639f"},{url:"/apple-icon-180.png",revision:"67b45ec1687679f903a0a7d95e0ee6bf"},{url:"/apple-touch-icon.png",revision:"edcf934cca00933673d92b900ffd90ed"},{url:"/booking-illustration.svg",revision:"2aaad0e411f052135037acd2450a0d91"},{url:"/favicon-16x16.png",revision:"11d36ba59af3937acb996ade6444a61d"},{url:"/favicon-32x32.png",revision:"f3275416bf3652f22c8c7649f21d5580"},{url:"/favicon.ico",revision:"1526bafbc145cb08153b3fcab92925b9"},{url:"/icons/android-chrome-192x192.png",revision:"b789e2d7286865867dfee313498d09bd"},{url:"/icons/android-chrome-512x512.png",revision:"b679ef4a8b3bc3fe686c56543d8e639f"},{url:"/icons/apple-icon-180.png",revision:"67b45ec1687679f903a0a7d95e0ee6bf"},{url:"/icons/apple-touch-icon.png",revision:"edcf934cca00933673d92b900ffd90ed"},{url:"/manifest.json",revision:"af2b196246a7365a96d2bc20bdebe196"},{url:"/site.webmanifest",revision:"68087c5eeccceaec51915da2d527ebeb"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
