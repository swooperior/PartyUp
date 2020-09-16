import React, {useState, useEffect} from 'react';
import pu from '../../api/pu';
import EventCard from '../components/EventCard';

const EventList = ({eventType}) => {
    const [results, setResults] = useState(null);

    const getEvents = async () => {
        await pu.get('events')
        // .then(res => res.json())
        .then(events => setResults(events.data));
        console.log(results);
    };
    useEffect(() => {
        getEvents()
    },[]);
    if (!results){
        return null;
    }
    return(
        <div class="EventList">
        <h1>{eventType}</h1>
        {results.map((event) => {
              return(
                <EventCard 
                    eid={event.eid}
                    title={event.title}
                    description={event.description}
                    members={event.members}
                    cap={event.cap}
                    start={new Date(event.start_date).toLocaleString()}
                    end={new Date(event.end_date).toLocaleString()}
                    created={event.e_created}
                    
                />
              );
            })}
        </div>
    );
    
    
}

export default EventList;