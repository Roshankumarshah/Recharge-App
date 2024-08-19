// import { createProxyMiddleware } from 'http-proxy-middleware';
// import { BASE_URL } from './const';

// export default function(app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: BASE_URL,
//       changeOrigin: true,
//       pathRewrite: { '^/api': '' },
//     })
//   );
// };