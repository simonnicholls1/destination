import React from 'react';
import styled from 'styled-components';

const BlogCard = ({ blog }) => {
  const { title, image, text } = blog;

  return (
    <StyledCard>
        <img src={image} alt={title} className="img" />
        <div className="text">
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
    </StyledCard>
  )
}

const StyledCard = styled.div`
    display: flex;
    width: 25%;
    height: 300px;
    margin: 10px;
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 10px;
    .img {
        width: 30%;
        height: 100%;
        object-fit: cover;
        align-self: center;
        margin-right: 10px;
    }
    .text {
        width: 70%;
        padding: 10px;
    }
`;

const BlogCardList = ({ blogs }) => {
    return (
        <StyledCardList>
            {blogs.slice(0,4).map((blog, index) => (
                <BlogCard key={index} blog={blog} />
            ))}
        </StyledCardList>
    )
}
const StyledCardList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
`
export default BlogCardList;