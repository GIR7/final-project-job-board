import dotenv from "dotenv";

dotenv.config();
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {UserRoutesInit} from "./user_routes.js";
import {JobListRoutesInit} from "./Joblist_routes.js";
import {SavedjobRoutesInit} from "./savedjob_routes.js";


/** This function creates all backend routes for the site
 *
 * @param {FastifyInstance} app - The base Fastify listen server instance
 * @param {{}} _options - Fastify instance options (Optional)
 * @returns {Promise<void>} - Returns all of the initialized routes
 */
async function JobsRoutes(app: FastifyInstance, _options = {}) {
	if (!app) {
		throw new Error("Fastify instance has no value during routes construction");
	}
	UserRoutesInit(app);
	JobListRoutesInit(app);
	SavedjobRoutesInit(app);


}

export default JobsRoutes;
