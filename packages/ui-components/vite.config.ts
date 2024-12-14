import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
	css: {
		preprocessorOptions: {
			scss: {
				api: "modern-compiler",
			},
		},
	},
	resolve: {
		alias: {
			"@components": path.resolve(__dirname, "./src/components"),
			"@app": path.resolve(__dirname, "./src/app"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@utils": path.resolve(__dirname, "./src/utils"),
		},
	},
})
