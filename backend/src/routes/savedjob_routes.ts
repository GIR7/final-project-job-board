import { FastifyInstance } from "fastify";
import { Savedjob } from "../db/entities/Savedjob.js";
import {Jobs} from "../db/entities/Jobs.js";
import { User } from "../db/entities/User.js";


export function SavedjobRoutesInit(app: FastifyInstance) {
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
                return reply.send({message: "Unsave successfully."});
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
            return reply.send({message: "Save successfully."});

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

}
