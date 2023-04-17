import React from 'react';
import water_temp_bodysuit from '../../assets/img/water-temp-bodysuit.png'
import water_temp_man from '../../assets/img/water-temp-man.png'
import weather_sun from '../../assets/img/weather-sun.png'
import weather_cloud from '../../assets/img/weather-cloud.png'

const DestinationCard = ({ country, description, image, onClick, seasons }) => {
  const cardStyles = {
    width: '350px',
    height: '400px',
    border: '1px solid lightgray',
    borderRadius: '10px',
    textAlign: 'center',
    padding: '10px',
    position: 'relative',
  };

  const titleStyles = {
    fontSize: '20px',
    fontWeight: 'bold',
    padding: '10px',
  };

  const descriptionStyles = {
    fontSize: '16px',
    color: 'gray',
    padding: '10px',
  };

  const linkStyles = {
    fontSize: '16px',
    color: 'orange',
    paddingTop: '30px',
    textDecoration: 'none',
    position: 'center',
    bottom: '10px',
  };

  const imgStyles = {
    width: '100%',
    height: '50%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
  };

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

const monthGridStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr repeat(12, minmax(0, 1fr))',
  alignItems: 'center',
  gridGap: '2px',
  marginLeft: '10px',
};

const seasonRowStyles = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '12px',
};

const seasonLabelStyles = {
  minWidth: '80px', // Set a minimum width for the label column
  fontSize: '12px', // Reduce font size for season labels
  fontWeight: 'bold',
  textAlign: 'right',
  paddingRight: '10px',
};


const monthStyles = {
  fontSize: '10px', // Reduce font size for month labels
  textAlign: 'center',
  minWidth: 'calc(100% / 12)', // Set a minimum width for the month columns
  boxSizing: 'border-box',
  paddingTop: '10px',
  paddingBottom: '10px'
};


const seasonBarStyles = (monthIndex) => ({
height: '10px',
backgroundColor: seasons.some((season) => season.months.includes(monthIndex)) ? 'green' : 'transparent',
borderRadius: '5px',
flexGrow: 1,
paddingTop: '5px'
});

const dotStyles = (color) => ({
  width: '15px',
  height: '15px',
  borderRadius: '50%',
  backgroundColor: color === 'green' ? 'green' : color === 'purple' ? 'purple' : 'grey',
  margin: '0 auto',
  marginTop: '3px'
});

const borderStyles = {
  borderTop: '1px solid #ccc',
  marginTop: 'px'
};

return (
  <div style={cardStyles}>
    <div style={titleStyles}>{country}</div>
    <div style={descriptionStyles}>{description}</div>
    <div style={monthGridStyles}>
      <span style={{ minWidth: '80px' }}></span>
      {months.map((month, index) => (
        <span key={index} style={monthStyles}>
          {month}
        </span>
      ))}
    </div>
    {seasons.map((season, index) => (
      <div key={index} style={seasonRowStyles}>
        <div style={seasonLabelStyles}>{season.name}</div>
        {season.name === 'Swell' ? (
          <div style={{ display: 'flex', width: 'calc(100% - 50px)', ...borderStyles }}>
           <div style={borderStyles}> </div>
            {season.months.map((color, monthIndex) => (
              <div
                key={monthIndex}
                style={{
                  display: 'flex',
                  flexBasis: 'calc(100% / 12)',
                  boxSizing: 'border-box',
                  paddingLeft: '1px',
                  paddingRight: '1px',
                }}
              >
                <div style={dotStyles(color)} />
              </div>
            ))}
          </div>
        ) : season.name === 'Water Temp' ? (
          <div style={{ display: 'flex', width: 'calc(100% - 50px)', ...borderStyles }}>
            {season.months.map((temp, monthIndex) => (
              <div
                key={monthIndex}
                style={{
                  display: 'flex',
                  flexBasis: 'calc(100% / 12)',
                  boxSizing: 'border-box',
                  paddingLeft: '1px',
                  paddingRight: '1px',
                }}
              >
                {temp === 'warm' ? (
                  <img src={water_temp_man} alt="Warm Water Temp" style={{width: '100%', height: 'auto', marginTop: '2px'}} />
                ) : temp === 'mild' ? (
                  <img src={water_temp_bodysuit} alt="Mild Water Temp" style={{width: '100%', height: 'auto', marginTop: '2px'}} />
                ) : (
                  <div/>
                )}
              </div>
            ))}
          </div>
        )
        : season.name === 'Weather' ? (
          <div style={{ display: 'flex', width: 'calc(100% - 50px)', ...borderStyles }}>
            {season.months.map((temp, monthIndex) => (
              <div
                key={monthIndex}
                style={{
                  display: 'flex',
                  flexBasis: 'calc(100% / 12)',
                  boxSizing: 'border-box',
                  paddingLeft: '1px',
                  paddingRight: '1px',
                }}
              >
                {temp === 'sunny' ? (
                  <img src={weather_sun} alt="Sunny" style={{width: '100%', height: 'auto', marginTop: '2px'}} />
                ) : temp === 'cloudy' ? (
                  <img src={weather_cloud} alt="Cloudy" style={{width: '100%', height: 'auto', marginTop: '2px'}} />
                ) : (
                  <div/>
                )}
              </div>
            ))}
          </div>
        )
        : (
          <div style={{ display: 'flex', width: 'calc(100% - 50px)' }}>
            {months.map((month, monthIndex) => (
              <div
                key={monthIndex}
                style={{
                  display: 'flex',
                  flexBasis: 'calc(100% / 12)',
                  boxSizing: 'border-box',
                  paddingLeft: '1px',
                  paddingRight: '1px',
                }}
              >
                <div style={seasonBarStyles(monthIndex)} />
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
    <a href="#" style={linkStyles} onClick={onClick}>
      Read More
    </a>
  </div>
);


};

const DestinationCardList = ({ destinations, onClick }) => {
  const cardListStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gridGap: '10px',
    padding: '10px',
  }
  return (
    <div style={cardListStyles}>
      {destinations.map((destination, index) => (
        <DestinationCard
          key={index}
          country={destination.country}
          description={destination.description}
          image={destination.image}
          seasons={destination.seasons}
          onClick={() => onClick(destination)}
        />
      ))}
    </div>
  )
}

export default DestinationCardList