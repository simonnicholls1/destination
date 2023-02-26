CREATE TABLE beaches(
	id integer primary key,
	name varchar(50) not null,
	latitude float not null,
	longitude float not null,
	country_code varchar(3) not null,
	nearest_city varchar(50) null,
    date_added timestamp not null default now(),
	date_updated timestamp null,
	surf bool not null default false
	active bool not null default true
);