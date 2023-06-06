import { Entity, Property, ManyToOne, Cascade } from "@mikro-orm/core";
import { DoggrBaseEntity } from "./DoggrBaseEntity.js";
import { User } from "./User.js";
import { Jobs } from './Jobs.js'

@Entity()
export class Savedjob extends DoggrBaseEntity {

	// The person who performed the match/swiped right
	// Delete this message if they are deleted
	@ManyToOne(
		() => User,
		{cascade: [Cascade.PERSIST]}
	)
	user!: User;

	// The account whose profile was swiped-right-on
	// Delete this message if they are deleted
	@ManyToOne(
		() =>Jobs,
		{cascade: [Cascade.PERSIST]}
	)
	job!: Jobs;

	// @Property()
	// message!: string;
}
