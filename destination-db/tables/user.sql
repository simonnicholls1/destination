CREATE TABLE users(
	id integer primary key generated always as identity,
	first_name varchar(50) not null,
	second_name varchar(80) not null,
	first_line_address varchar(250) not null,
	second_line_address varchar(250),
	city varchar(40) not null,
	country_code varchar(3) not null,
	post_code varchar(10) not null,
	date_of_birth date not null,
	email varchar(100) not null,
	password varchar(100) not null,
	registered_on timestamp not null default now(),
	confirmed bool not null default false,
	admin_flag bool not null default false
);