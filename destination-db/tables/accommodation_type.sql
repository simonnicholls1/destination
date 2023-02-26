CREATE TABLE accomodation_type(
	type_id integer primary key generated always as identity,
	type varchar(30) not null
);

INSERT INTO accomodation_type(type) VALUES('Apartments');
INSERT INTO accomodation_type(type) VALUES('Hotels');
INSERT INTO accomodation_type(type) VALUES('Guesthouses');
INSERT INTO accomodation_type(type) VALUES('Homestays');
INSERT INTO accomodation_type(type) VALUES('Resorts');
INSERT INTO accomodation_type(type) VALUES('Bed and Breakfasts');
INSERT INTO accomodation_type(type) VALUES('Villas');
INSERT INTO accomodation_type(type) VALUES('Hostels');
INSERT INTO accomodation_type(type) VALUES('Vacation Homes');
INSERT INTO accomodation_type(type) VALUES('Inns');
INSERT INTO accomodation_type(type) VALUES('Country Houses');
INSERT INTO accomodation_type(type) VALUES('Condo Hotels');
INSERT INTO accomodation_type(type) VALUES('Lodges');
INSERT INTO accomodation_type(type) VALUES('Resort Villages');
INSERT INTO accomodation_type(type) VALUES('Chalets');
INSERT INTO accomodation_type(type) VALUES('Campgrounds');
INSERT INTO accomodation_type(type) VALUES('Luxury tents');

