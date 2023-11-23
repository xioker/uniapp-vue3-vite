import { loadEnv, defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'
import viteCompression from "vite-plugin-compression";
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode,process.cwd())
	return {
		plugins: [
			uni(),
			// AutoImport
			AutoImport({
				imports: ['vue','pinia','uni-app'],
				// dts: false
			}),
			// GZIP comporession
			viteCompression({
				disable: true,
				deleteOriginFile: true,
				threshold: 10240,
				algorithm: 'gzip',
				ext: '.gz'
			})
		],
		// alias config
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src')
			}
		},
		// scss preprocessor
		css: {
			preprocessorOptions: {
				scss: {
					// addtionalData: `@use "@/src/styles/global.scss" as *;`
					addtionalData: `@import "@/src/styles/global.scss";`
				},
			}
		},
		// local proxy
		server: {
			open: false,
			host: true,
			strictPort: true,
			port: Number(env.VITE_APP_PORT),
			proxy: {}
		},
		// production config
		build: {
			base: '/',
			outDir: 'dist',
			assetsDir: 'assets',
			sourcemap: false,
			minify: 'terser',
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true,
				}
			}
		}
	}
});
