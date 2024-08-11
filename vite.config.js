import { defineConfig } from 'vite';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default defineConfig({
  // Customize configuration as needed
  plugins: [
    // ... other plugins
    process.env.REPORT === 'true' ? new BundleAnalyzerPlugin() : null,
  ],
  build: {
    reportCompressedSize: true, // Enable gzip compression size reporting
  },
  server: {
    port: 3000,
  }
});