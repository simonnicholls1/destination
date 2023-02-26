CREATE TABLE surf_features(
	accomodation_id integer primary key,
	nearest_beach_id integer null,
	beach_distance_m int null,
	board_rental bool not null default false,
	lessons bool not null default false,
	lessons_on_site not null default false,
	CO2_compensation bool not null default false,
	yoga_on_site bool not null default false,
	co_working_space bool not null default false,
	date_added timestamp not null default now(),
	date_updated timestamp null
);