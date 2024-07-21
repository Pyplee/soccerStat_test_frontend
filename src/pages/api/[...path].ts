import { createProxyMiddleware } from "http-proxy-middleware";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;

const proxyConfig: any = {
  target: baseUrl,
  changeOrigin: true,
  timeout: 10000,
  pathRewrite: { "^/api/proxy": "" },
};

export default createProxyMiddleware(proxyConfig);

export const config = {
  api: {
    bodyParser: false,
  },
};
