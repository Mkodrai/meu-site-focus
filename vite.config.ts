import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // 👇 ESSENCIAL para GitHub Pages
  base: "/meu-site-focus/",

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

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: ["favicon.ico", "icons/*.svg"],

      manifest: {
        name: "Focus Forge OS",
        short_name: "FocusForge",

        description:
          "Sistema de comando pessoal para disciplina financeira, física e intelectual",

        theme_color: "#0a0a0b",
        background_color: "#0a0a0b",

        display: "standalone",
        orientation: "portrait",

        // 👇 Ajustado para GitHub Pages
        scope: "/meu-site-focus/",
        start_url: "/meu-site-focus/",

        icons: [
          {
            src: "icons/icon-192x192.svg",
            sizes: "192x192",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
          {
            src: "icons/icon-512x512.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],

        categories: ["productivity", "finance", "health"],
        lang: "pt-BR",
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],

        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*supabase\.co\/.*/i,

            handler: "NetworkFirst",

            options: {
              cacheName: "supabase-cache",

              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 24h
              },
            },
          },
        ],
      },

      devOptions: {
        enabled: true,
      },
    }),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
