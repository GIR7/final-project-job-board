import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
// import { MessageSeeder } from "./MessageSeeder.js";
import {UserSeeder} from "./UserSeeder.js";
import {JobsSeeder} from "./JobsSeeder.js"
export class DatabaseSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		return this.call(em, [
			UserSeeder,
			JobsSeeder,
			// MessageSeeder
		]);
	}
}
