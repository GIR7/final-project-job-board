import dotenv from "dotenv";

dotenv.config();
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {Jobs} from "./db/entities/Jobs.js";

import { Savedjob } from "./db/entities/Savedjob.js";
import { User } from "./db/entities/User.js";
import { Createsavedjob } from "./types.js";


/** This function creates all backend routes for the site
 *
 * @param {FastifyInstance} app - The base Fastify listen server instance
 * @param {{}} _options - Fastify instance options (Optional)
 * @returns {Promise<void>} - Returns all of the initialized routes
 */
async function DoggrRoutes(app: FastifyInstance, _options = {}) {
	if (!app) {
		throw new Error("Fastify instance has no value during routes construction");
	}
	
	app.get("/hello", async (_request: FastifyRequest, _reply: FastifyReply) => {
		return "hello";
	});
	
	// this routes take care of by the filter job routes
	// app.get("/alljobs", async (request: FastifyRequest, _reply: FastifyReply) => {
	// 	return request.em.find(Jobs, {});
	// })
	
	//get the job lists based on the filter provided
	app.search<{ Body: { type: string, status: string } }>
	("/filterjobs", async (req, res) => {
		const {type, status} = await req.body;
		
		try {//different filter request with different query to database
			
			if (type && status) {
				const jobs = await req.em.find(Jobs, {type, status});
				res.status(200).send(jobs);
			}
			if (type) {
				const jobs = await req.em.find(Jobs, {type})
				res.status(200).send(jobs);
			}
			if (status) {
				const jobs = await req.em.find(Jobs, {status});
				res.status(200).send(jobs);
			}
			if (!type && !status) {
				const jobs = await req.em.find(Jobs, {});
				res.status(200).send(jobs);
			}
		} catch (e) {
			
			console.error(e);
			res.status(500).send(e);
		}
	})
	
	//Save and Un save a job:
	app.post<{ Body: { user_id: number; job_id: number } }>("/saved", async (req, reply) => {
		const {user_id, job_id} = req.body;
		try {
			//get the user based on the user id
			const user = await req.em.findOne(User, {id: user_id});
			//get the job based on the job id
			const job = await req.em.findOne(Jobs, {id: job_id});
			//check to see if relationship is already established
			const existingSave = await req.em.findOne(Savedjob, {user, job});
			
			if (existingSave) {
				// Remove the existing save entry to unstar the job
				await req.em.removeAndFlush(existingSave);
			} else {
				
				//create a new relationship between them
				const save = await req.em.create(Savedjob, {
					user,
					job,
				});
				
				//persist it to the database
				await req.em.flush();
			}
			// send the match back to the user
			return reply.send({message: "Save status updated successfully."});
			
		} catch (err) {
			app.log.error(err);
			return reply.status(500).send(err);
		}
	});
	
	//try to get the list of saved job from savedjob db based on the user id
	app.search<{ Body: { userid: number } }>("/savedjobs", async (req, res) => {
		const {userid} = req.body;
		try {
			//get all the saved job entity
			const savedJobs = await req.em.find(Savedjob, {user_id: userid});
			//retrieve all the job ID
			const jobIds = savedJobs.map(savedJob => savedJob.job.id);
			//Find all job entities in job base on the retrieved job id
			const jobs = await req.em.find(Jobs, {id: {$in: jobIds}});
			res.status(200).send(jobs);
		} catch (e) {
			console.error(e);
			res.status(500).send(e);
		}
	});
	
	// //One job detail page based on the job id
	// app.search<{ Body: { jobid: number } }>
	// ("/jobs/id", async (req, res) => {
	// 	const {jobid} = await req.body;
	//
	// 	try {
	// 		const thejob = await req.em.find(Jobs, {id: jobid})
	// 		res.status(200).send(thejob);
	// 	} catch (e) {
	//
	// 		console.error(e);
	// 		res.status(500).send(e);
	// 	}
	// })
	
	//Refactor above, get request to get the job detail based on the params jobid
	app.get<{ Params: { jobid: number } }>
	("/jobs/:jobid", async (req, res) => {
		const {jobid} = await req.params;
		
		try {
			const thejob = await req.em.find(Jobs, {id: jobid})
			res.status(200).send(thejob);
		} catch (e) {
			
			console.error(e);
			res.status(500).send(e);
		}
	})
}

export default DoggrRoutes;
