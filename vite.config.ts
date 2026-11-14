import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Solo desarrollo: receptor de pedidos de prueba (/api/test-order) para testear el checkout sin servidor real.
    mode === "development" && {
      name: "test-order-endpoint",
      configureServer(server: { middlewares: { use: (path: string, fn: (req: any, res: any) => void) => void } }) {
        server.middlewares.use("/api/test-order", (req, res) => {
          let body = "";
          req.on("data", (c: Buffer) => (body += c));
          req.on("end", () => {
            console.log("[test-order] pedido recibido:", body);
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: true, reference: `TEST-${Date.now().toString(36).toUpperCase()}` }));
          });
        });
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
