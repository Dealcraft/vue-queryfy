import { Query } from "./types/Query.ts";
import { PluginOptions } from "./types/PluginOptions.ts";
import { HTTPVerb } from "./constants/HTTPVerb.ts";
import { loggerService } from "./loggerService.ts";
import { Logger } from "./types/Logger.ts";
import { DefaultMergedOptions } from "./utils.ts";

export class QueryRunner implements Query {
	private options: PluginOptions;
	private logger: Logger;
	constructor(options: DefaultMergedOptions) {
		this.options = options;
		this.logger = new loggerService(options.logLevel, options.logger);
	}

	async request<T = unknown>(
		method: HTTPVerb,
		route: string,
		body?: object | string
	): Promise<T> {
		const fetchInit: RequestInit = {
			method,
		};

		if (body) {
			if (typeof body === "string") fetchInit.body = body;
			if (typeof body === "object") fetchInit.body = JSON.stringify(body);
		}

		this.logger.debug(`Constructing full URL for ${route}`);
		const fullUrl: string = `${this.options.baseUrl}${route}`;

		this.logger.log(`Sending request to ${fullUrl}`);
		const result: Response = await fetch(fullUrl, fetchInit);

		return result.json();
	}

	async get<T = unknown>(route: string): Promise<T> {
		this.logger.log(`GET ${route}`);
		return this.request<T>(HTTPVerb.GET, route);
	}

	async post<T = unknown>(route: string, body?: object | string): Promise<T> {
		this.logger.log(`POST ${route}`);
		return this.request<T>(HTTPVerb.POST, route, body);
	}
}