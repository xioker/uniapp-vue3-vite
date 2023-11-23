import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia'
import i18n from './locale/index.js'
import '@/styles/index.scss'

export function createApp() {
	const app = createSSRApp(App);
	app.use(i18n)
	app.use(createPinia())
	return {
		app,
	};
}
