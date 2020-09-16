import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import EventList from '../components/EventList';

const Home = () => {
    return (
    <div className="App">
      
      {/* <Link to={'./list'}> */}
      {/* </Link> */}
      <EventList eventType="Upcoming Events"/>
      
    </div>
    );
}

export default Home;
