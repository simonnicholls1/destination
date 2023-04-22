import React from 'react';

const RatingCard = ({ rating }) => {
  const ratingCardStyle = {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };

  const ratingUserStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const ratingCommentStyle = {
    fontSize: '14px',
  };

  return (
    <div style={ratingCardStyle}>
      <div style={ratingUserStyle}>{rating.user}</div>
      <div style={ratingCommentStyle}>{rating.comment}</div>
    </div>
  );
};

export default RatingCard;
