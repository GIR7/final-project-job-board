import { Migration } from '@mikro-orm/migrations';

export class Migration20230606175700 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "savedjob" drop constraint "savedjob_user_id_foreign";');
    this.addSql('alter table "savedjob" drop constraint "savedjob_job_id_foreign";');

    this.addSql('alter table "savedjob" alter column "user_id" type int using ("user_id"::int);');
    this.addSql('alter table "savedjob" alter column "user_id" set not null;');
    this.addSql('alter table "savedjob" alter column "job_id" type int using ("job_id"::int);');
    this.addSql('alter table "savedjob" alter column "job_id" set not null;');
    this.addSql('alter table "savedjob" add constraint "savedjob_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "savedjob" add constraint "savedjob_job_id_foreign" foreign key ("job_id") references "joblist" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "savedjob" drop constraint "savedjob_user_id_foreign";');
    this.addSql('alter table "savedjob" drop constraint "savedjob_job_id_foreign";');

    this.addSql('alter table "savedjob" alter column "user_id" type int using ("user_id"::int);');
    this.addSql('alter table "savedjob" alter column "user_id" drop not null;');
    this.addSql('alter table "savedjob" alter column "job_id" type int using ("job_id"::int);');
    this.addSql('alter table "savedjob" alter column "job_id" drop not null;');
    this.addSql('alter table "savedjob" add constraint "savedjob_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "savedjob" add constraint "savedjob_job_id_foreign" foreign key ("job_id") references "joblist" ("id") on update cascade on delete cascade;');
  }

}
