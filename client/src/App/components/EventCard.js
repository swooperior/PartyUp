//ToDo; link card to event details page using eid

import React from 'react';

const EventCard = ({eid, title, description, members, cap, start, end, created}) => {
    
    return(
        <div className="EventCard">
            <div className="CardImg"></div>
            <div className="CardText">
                <div className="CardTimes">
                    {start}
                </div>
                <div className="CardTitle">
                    {title}
                </div>
                <div className="CardDesc">
                    {description}
                </div>
                <div className="CardFooter">
                    <div className="CardMembers">
                        {members.length} / {cap}
                    </div>
                    <div className="CardCreated">
                        {created}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventCard;