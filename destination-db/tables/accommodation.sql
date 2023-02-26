CREATE TABLE accommodation(
	id integer primary key generated always as identity,
	name varchar(300) not null,
	address varchar(300) not null,
	city varchar(100) not null,
	country varchar(100) not null,
	country_code varchar(3) not null,
	post_code varchar(20) not null,
	latitude float not null,
	longitude float not null,
	accom_type_id integer not null,
	booking_url varchar(800) null,
    photo_url varchar(800) null,
    url varchar(800) null,
	date_added timestamp not null default now(),
	date_updated timestamp null,
	active bool not null default true,
	FOREIGN KEY (accom_type_id) REFERENCES accomodation_type(type_id)
);



