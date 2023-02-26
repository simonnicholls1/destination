import React from 'react';
import { Button } from 'react-bootstrap';
import search from '../../img/search.png'

const SearchButton = (props) => (
    <Button variant="primary" {...props}>
        <img src={search}/>
    </Button>
);

export default SearchButton;
