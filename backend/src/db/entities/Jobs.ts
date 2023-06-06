import {Entity, Property} from "@mikro-orm/core";
import {DoggrBaseEntity} from "./DoggrBaseEntity.js";

@Entity({ tableName: "joblist"})
export class Jobs extends DoggrBaseEntity {
	@Property()
	title!: string;
	
	@Property()
	type!: string;
	
	@Property()
	status!: string;
	
	@Property()
	description!: string;
}
