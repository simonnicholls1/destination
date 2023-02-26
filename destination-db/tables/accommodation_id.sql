CREATE TABLE accomodation_id(
	accomodation_id integer not null,
	external_id integer  not null,
	external_id_type integer not null,
	PRIMARY KEY (accomodation_id, external_id, external_id_type),
	FOREIGN KEY (external_id_type) REFERENCES accomodation_id_mapping(id),
    FOREIGN KEY (accomodation_id) REFERENCES accomodation(id)
);