import React from 'react';

const RoomCard = (roomData) => {
    const { blocks, photos, facilities } = roomData;

    return (
        <>
        <div>
            {blocks.map((block, index) => (
                <div key={index}>
                    <h2>{block.name}</h2>
                    <p>Price: {block.gross_ammount ? `$${block.gross_ammount}` : 'Not Available'}</p>
                    <a href={`https://hotelbooking.com/book/${block.room_id}`}>Book Now</a>
                    <div >
                        {photos.map((photo, photoIndex) => (
                            <img key={photoIndex} src={photo} alt={`room ${index} photo ${photoIndex}`} />
                        ))}
                    </div>
                    <div>
                        {facilities.map((facility, facilityIndex) => (
                            <p key={facilityIndex}>{facility}</p>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        </>
    );
};

const RoomCardList = (rooms) => {
    return (
        <>
        <div>
            {Object.keys(rooms).map((roomId) => (
                <RoomCard key={roomId} roomData={rooms[roomId]} />
            ))}
        </div>
        </>
    );
};

export default RoomCardList;
