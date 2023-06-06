// import type { Dictionary, EntityManager } from "@mikro-orm/core";
// import { Seeder } from '@mikro-orm/seeder';
// import { Savedjob } from "../entities/Savedjob.js";
// import {User} from "../entities/User.js";
//
// export class MessageSeeder extends Seeder {
// 	async run(em: EntityManager, context: Dictionary): Promise<void> {
//
// 		const msgRepo = em.getRepository(Savedjob);
//
// 		// https://mikro-orm.io/docs/seeding#shared-context
//
// 		msgRepo.create({
// 			sender: context.user1,
// 			receiver:
// 			// message: "Test message 1",
// 		});
// 		msgRepo.create({
// 			sender: context.user2,
// 			receiver: job2,
// 			// message: "Test message 2",
// 		});
// 		msgRepo.create({
// 			sender: context.user3,
// 			receiver: job3,
// 			// message: "Test message 3",
// 		});
//
// 	}
// }
