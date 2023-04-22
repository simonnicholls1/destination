import React from 'react';

const HotelRoomCard = ({ room }) => {
  const hotelRoomCardStyle = {
    display: 'flex',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };

  const roomImageStyle = {
    width: '300px',
    height: '200px',
    objectFit: 'cover',
    marginRight: '10px',
  };

  const roomInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const roomNameStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
  };

  const roomDescriptionStyle = {
    fontSize: '14px',
    marginBottom: '10px',
  };

  const roomPriceStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
  };

  return (
    <div style={hotelRoomCardStyle}>
      <img src={room.image} alt={room.name} style={roomImageStyle} />
      <div style={roomInfoStyle}>
        <div>
          <div style={roomNameStyle}>{room.name}</div>
          <div style={roomDescriptionStyle}>{room.description}</div>
        </div>
        <div style={roomPriceStyle}>${room.price} per night</div>
      </div>
    </div>
  );
};

export default HotelRoomCard;
