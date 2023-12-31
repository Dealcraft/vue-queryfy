import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import eslintPlugin from "vite-plugin-eslint";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "src/lib/index.ts"),
			name: "vue-queryfy",
			fileName: format => `vue-queryfy.${format}.js`,
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue",
				},
			},
		},
	},
	plugins: [
		vue(),
		eslintPlugin(),
		dts({
			include: ["src/lib/**/*.ts"],
			outDir: "dist/types",
			rollupTypes: true,
		}),
	],
});
