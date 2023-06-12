import {FastifyInstance} from "fastify";
import {Jobs} from "../db/entities/Jobs.js";


export function JobListRoutesInit(app: FastifyInstance) {

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

    //get request to get the job detail based on the params jobid
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
