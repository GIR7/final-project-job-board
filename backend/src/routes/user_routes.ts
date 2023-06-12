
import { FastifyInstance } from "fastify";
import { User } from "../db/entities/User.js";

export function UserRoutesInit(app: FastifyInstance) {
//Create/Check a user and return its user (id).
    app.post<{ Body: { name: string, email: string } }>("/users", async (req, reply) => {
        const {name, email} = req.body;
        try {
            // Check if the user already exists in the database based on the email
            let user = await req.em.findOne(User, {email});
            console.log("user line 34", user)
            if (!user) {
                // If the user doesn't exist, create a new user record
                const newUser = await req.em.create(User, {
                    name,
                    email
                });
                console.log("create a new user", newUser)
                await req.em.flush();
                return reply.send(newUser);
            } else {
                // If the user exists, update the user's name OR do nothing...
                user.name = name;
                return reply.send(user);
            }

        } catch (err) {
            return reply.status(500).send({message: err.message});
        }
    });


}
