import React from 'react';

const SearchForm = ({ searchCriteria, setSearchCriteria, handleSearch }) => (
  <form onSubmit={handleSearch}>
    <div className="form-group">
      <label htmlFor="location">Location</label>
      <input
        type="text"
        className="form-control"
        id="location"
        name="location"
        value={searchCriteria.location}
        onChange={(event) => {
          const { name, value } = event.target;
          setSearchCriteria({ ...searchCriteria, [name]: value });
        }}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="arrival_date">Arrival Date</label>
      <input
        type="date"
        className="form-control"
        id="arrival_date"
        name="arrival_date"
        value={searchCriteria.arrival_date}
        onChange={(event) => {
          const { name, value } = event.target;
          setSearchCriteria({ ...searchCriteria, [name]: value });
        }}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="departure_date">Departure Date</label>
      <input
        type="date"
        className="form-control"
        id="departure_date"
        name="departure_date"
        value={searchCriteria.departure_date}
        onChange={(event) => {
          const { name, value } = event.target;
          setSearchCriteria({ ...searchCriteria, [name]: value });
        }}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="guests">Guests</label>
      <input
        type="number"
        className="form-control"
        id="guests"
        name="guests"
        value={searchCriteria.guests}
        onChange={(event) => {
          const { name, value } = event.target;
          setSearchCriteria({ ...searchCriteria, [name]: value });
        }}
        min={1}
        required
      />
    </div>
    <button type="submit" className="btn btn-primary">
      Search
    </button>
  </form>
);

export default SearchForm;
