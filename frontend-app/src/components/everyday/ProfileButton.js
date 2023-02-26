import React from 'react';
import { Button } from 'react-bootstrap';
import profile from '../../img/profile.png'

const ProfileButton = (props) => (
    <Button variant="primary" {...props}>
        <img src={profile}/>
    </Button>
);

export default ProfileButton;
