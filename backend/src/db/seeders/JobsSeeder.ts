import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from '@mikro-orm/seeder';
import {Jobs} from "../entities/Jobs.js";
import {User} from "../entities/User.js";

export class JobsSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		// https://mikro-orm.io/docs/seeding#shared-context
		 em.create(Jobs, {
			
			title:"SDE1",
			type:"Remote",
			status:"CPT",
			description:"This is just a test seeder for job1 SDE"
		});
		
		em.create(Jobs, {
			
			title:"SDE2",
			type:"Remote",
			status:"OPT",
			description:"This is just a test seeder for job2 SDE"
		});
		
		 em.create(Jobs, {
			
			title:"SDE3",
			type:"Onsite",
			status:"Sponsor H1B visa",
			description:"This is just a test seeder for job3 SDE"
		});
		
		 em.create(Jobs, {
			
			title:"SDE4",
			type:"Hybrid",
			status:"CPT",
			description:"This is just a test seeder for job4 SDE"
		});
		em.create(Jobs, {
			
			title:"SDE5",
			type:"Hybrid",
			status:"CPT",
			description:"This is just a test seeder for job4 SDE"
		});
		em.create(Jobs, {
			
			title:"SDE6",
			type:"Hybrid",
			status:"OPT",
			description:"This is just a test seeder for job4 SDE"
		});
	}
}
