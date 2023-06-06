import { Migration } from '@mikro-orm/migrations';

export class Migration20230604010716 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "joblist" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "type" varchar(255) not null, "status" varchar(255) not null, "description" varchar(255) not null);');

    this.addSql('create table "users" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "name" varchar(255) not null);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql('create table "savedjob" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id" int null, "job_id" int null);');

    this.addSql('alter table "savedjob" add constraint "savedjob_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "savedjob" add constraint "savedjob_job_id_foreign" foreign key ("job_id") references "joblist" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "message" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "savedjob" drop constraint "savedjob_job_id_foreign";');

    this.addSql('alter table "savedjob" drop constraint "savedjob_user_id_foreign";');

    this.addSql('create table "message" ("id" serial primary key, "created_at" timestamptz not null default null, "updated_at" timestamptz not null default null, "sender_id" int4 null default null, "receiver_id" int4 null default null);');

    this.addSql('drop table if exists "joblist" cascade;');

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('drop table if exists "savedjob" cascade;');
  }

}
