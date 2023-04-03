import React from 'react';

const DestinationCard = ({ country, description, image, onClick }) => {
  const cardStyles = {
    width: '300px',
    height: '400px',
    border: '1px solid lightgray',
    borderRadius: '10px',
    textAlign: 'center',
    padding: '10px',
    position: 'relative'
  }

  const titleStyles = {
    fontSize: '20px',
    fontWeight: 'bold',
    padding: '10px',
  }

  const descriptionStyles = {
    fontSize: '16px',
    color: 'lightgray',
    padding: '10px',
  }

  const linkStyles = {
    fontSize: '16px',
    color: 'orange',
    padding: '10px',
    textDecoration: 'none',
    position: 'absolute',
    bottom: '10px'
  }

  const imgStyles = {
    width: '100%',
    height: '50%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0'
  }
  return (
    <div style={cardStyles}>
      <div style={titleStyles}>{country}</div>
      <div style={descriptionStyles}>{description}</div>
      <a href="#" style={linkStyles} onClick={onClick}>Read More</a>
      <img src={image} alt={country} style={imgStyles} />
    </div>
  )
}

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
          onClick={() => onClick(destination)}
        />
      ))}
    </div>
  )
}

export default DestinationCardList