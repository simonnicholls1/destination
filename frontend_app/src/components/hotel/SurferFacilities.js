import React from 'react';


const facilitiesStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)', // Divide the list into 4 columns
  gap: '10px', // Add a 10px gap between each item
};

const Facility = ({ facilityName, isAvailable }) => (
  <li style={{ color: isAvailable ? 'black' : 'lightgrey' }}>
    {facilityName}: {isAvailable ? 'Available' : 'Not Available'}
  </li>
);


const SurferFacilities = ({ hotel }) => {
  return (
    <ul style={facilitiesStyle}>
      <Facility facilityName="Surf Lessons" isAvailable={hotel.surf_lessons} />
      <Facility facilityName="Surf Rental" isAvailable={hotel.surf_rental} />
      <Facility facilityName="Yoga" isAvailable={hotel.yoga} />
      <Facility facilityName="Less than 1km to surf" isAvailable={hotel.less_1km_surf} />
      <Facility facilityName="Co-working" isAvailable={hotel.co_working} />
      <Facility facilityName="CO2 Compensated" isAvailable={hotel.co2Compensated} />
      <Facility facilityName="Surf Break Access" isAvailable={hotel.surfBreakAccess} />
    </ul>
  );
};

export default SurferFacilities;
