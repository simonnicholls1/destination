CREATE TABLE accomodation_id_mapping(
	id integer primary key generated always as identity,
	name varchar(50) not null
);

INSERT INTO accomodation_id_mapping(name) VALUES('BOOKING');