import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  padding: 15px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  height: 220px; // Set a fixed height for the cards

  .img {
    width: 220px;
    height: auto;
    border-radius: 15px;
    margin-right: 15px;
  }

  .text {
    display: flex;
    flex-direction: column;
    height: 100%; // Ensure the text container takes up the full height

    h3 {
      margin: 0;
      margin-bottom: 5px;
    }

    .date {
      color: grey;
      font-size: 0.9em;
      margin-bottom: 10px;
    }

    p {
      overflow: hidden; // Hide the overflowing text
      text-overflow: ellipsis; // Add an ellipsis when the text overflows
      white-space: wrap;
      max-height: calc(100% - 2em); // Limit the height of the paragraph
    }

    .read-more {
      color: orange;
      text-decoration: none;
    }
  }
`;

const FeaturedDestination = ({ destination }) => {
  const { title, image } = blog;

  return (
    <StyledCard>
      <img src={image} alt={title} className="img" />
      <h3>{title}</h3>
    </StyledCard>
  );
};

const FeaturedDestinationCardList = ({ blogs }) => {
    return (
        <StyledCardList>
            {blogs.slice(0,3).map((blog, index) => (
                <FeaturedDestinationCard key={index} blog={blog} />
            ))}
        </StyledCardList>
    )
}

const StyledCardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(800px, 800px));
  grid-gap: 20px;
  margin: 0 auto;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;


export default FeatureddestinationCardList;