import { createApp } from "vue";
import App from "./App.vue";
import { VueQueryfyPlugin } from "./lib";
import { LogLevel } from "./lib/constants/LogLevel.ts";

createApp(App)
	.use(VueQueryfyPlugin, {
		baseUrl: "https://jsonplaceholder.typicode.com",
		maxLoadingTime: 1000,
		logLevel: LogLevel.DEBUG,
	})
	.mount("#app");
