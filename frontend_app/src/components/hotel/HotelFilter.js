import React, { useState } from 'react';

const HotelFilter = ({ hotels, handleFilter }) => {
  const [filters, setFilters] = useState({
    surfLessons: false,
    surfRental: false,
    yoga: false,
    closeToSurf: false,
    coWorkingSpace: false,
    breakfastIncluded: false,
    co2Compensated: false,
    surfBreakAccess: false,
    budget: 1000,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFilter(filters);
  }

  const handleFilterChange = (event) => {
    const {name, value, checked} = event.target;
    setFilters(prevFilters => {
      return {
        ...prevFilters,
        [name]: (name === 'budget' ? value : checked)
      }
    });
    handleFilter({...filters, [name]: (name === 'budget' ? value : checked)});
  }

  let filteredHotels = hotels;

  if (filters.surfLessons) {
    filteredHotels = filteredHotels.filter(hotel => hotel.surfLessons);
  }

  if (filters.surfRental) {
    filteredHotels = filteredHotels.filter(hotel => hotel.surfRental);
  }

  if (filters.yoga) {
    filteredHotels = filteredHotels.filter(hotel => hotel.yoga);
  }

  if (filters.closeToSurf) {
    filteredHotels = filteredHotels.filter(hotel => hotel.distanceToSurf < 1);
  }

  if (filters.coWorkingSpace) {
    filteredHotels = filteredHotels.filter(hotel => hotel.coWorkingSpace);
  }

  if (filters.co2Compensated) {
    filteredHotels = filteredHotels.filter(hotel => hotel.co2Compensated);
  }

  if (filters.breakfastIncluded) {
    filteredHotels = filteredHotels.filter(hotel => hotel.breakfastIncluded);
  }

  if (filters.budget > 0) {
    filteredHotels = filteredHotels.filter(hotel => hotel.price <= filters.budget);
  }

  if (filters.surfBreakAccess !== 'all') {
    filteredHotels = filteredHotels.filter(hotel => hotel.surfBreakAccess === filters.surfBreakAccess);
  }

const [isPopularFiltersOpen, setIsPopularFiltersOpen] = useState(true);

const [budget, setBudget] = useState(1000);

const handleBudgetChange = (e) => {
  setBudget(e.target.value);
  setFilters({ ...filters, budget: e.target.value });
}

const togglePopularFilters = () => {
  setIsPopularFiltersOpen(!isPopularFiltersOpen);
}

const separatorStyles = {
    
  height: '1px',
  background: 'lightgray',
  margin: '10px 10px 0px 10px',
  display: 'block',
}


  return (<form className="filter-form" 
                onSubmit={handleSubmit} 
                style={{ border: '1px solid lightgray', 
                         borderRadius: '10px',
                         paddingLeft: '10px',
                         paddingBottom: '10px' }}>
    <h5 onClick={togglePopularFilters}>Popular Filters</h5>
    <div style={{ display: isPopularFiltersOpen ? 'block' : 'none', transition: 'display 0.3s ease' }}>
      <label>
        <input
          type="checkbox"
          name="surfLessons"
          checked={filters.surfLessons}
          onChange={handleFilterChange} />
        Surf Lessons
      </label>
  <div className="filter-row">
      <label>
        <input
          type="checkbox"
          name="surfRental"
          checked={filters.surfRental}
          onChange={handleFilterChange} />
        Surf Rental
      </label>
    </div><div className="filter-row"><label>
      <input
        type="checkbox"
        name="yoga"
        checked={filters.yoga}
        onChange={handleFilterChange} />
      Yoga
    </label>
    </div>
    <div className="filter-row">
      <label>
        <input
          type="checkbox"
          name="closeToSurf"
          checked={filters.closeToSurf}
          onChange={handleFilterChange} />
        Less than 1km to Surf
      </label>
     </div>
     <div className="filter-row">
      <label>
        <input
          type="checkbox"
          name="brekfastIncluded"
          checked={filters.breakfastIncluded}
          onChange={handleFilterChange} />
        Co-Working Space
      </label>
    </div>
    <div className="filter-row">
      <label>
        <input
          type="checkbox"
          name="coWorkingSpace"
          checked={filters.coWorkingSpace}
          onChange={handleFilterChange} />
        Co-Working Space
      </label>
    </div>
    <div className="filter-row">
      <label>
        <input
          type="checkbox"
          name="co2Compensated"
          checked={filters.co2Compensated}
          onChange={handleFilterChange} />
        Co2-Compensated
      </label>
    </div>
    </div>
    <div style={separatorStyles} />
    <div className="filter-row">
      <h5>Your Budget</h5>
    <input 
      type="range" 
      min={0} 
      max={1000} 
      value={budget} 
      onChange={handleBudgetChange} 
    />
    <p>Budget: {filters.budget}</p>
    </div>
    <div style={separatorStyles} />
    <div className="filter-row">
      <h5>Surf Break Access</h5>
      <select
        name="surfBreakAccess"
        value={filters.surfBreakAccess}
        onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="easy">Easy</option>
        <option value="intermediate">Intermediate</option>
        <option value="hard">Hard</option>
      </select>
    </div>
</form>
  );
};

export default HotelFilter;