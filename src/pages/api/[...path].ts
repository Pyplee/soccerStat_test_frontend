import { createProxyMiddleware } from "http-proxy-middleware";

const proxyConfig: any = {
  target: "https://api.football-data.org/v4",
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
