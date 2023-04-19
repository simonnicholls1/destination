import React, {useState} from 'react';
import CampType from '../../assets/img/camp_type.png'
import HotelType from '../../assets/img/hotel_type.png'
import VillaType from '../../assets/img/villa_type.png'

const Card = ({ hotel }) => {
    const cardStyles = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        alignItems: 'center',
        flexDirection: 'column',
        width: '340px',
        height: '460px',
    }

const hotelNameStyles = {
  display: '-webkit-box',
  '-webkit-line-clamp': 2,
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
  whiteSpace: 'normal',
  wordWrap: 'break-word',
  fontSize: '14px'
};

   const locationStyles = {
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.5)',
    marginBottom: '5px'
  }

    const imageStyles = {
        boxShadow: '0px 10px 20px rgba(0,0,0,0.19), 0px 6px 6px rgba(0,0,0,0.23)',
        borderRadius: '1em',
        width: '100%',
        height: '70%',
    }

    const faviconStyles = {
        width: '40px',
        height: '40px',
        display: 'inline-block',
        marginRight: '10px',
        float: 'left',
    }
    
    const bowStyles = {
        width: '30px',
        height: '30px',
        background: '#000',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        float: 'right',
        marginTop: '-10px',
    }

    const hotelTypeImages = [
        {
          type: 'camp',
          image: CampType,
        },
        {
          type: 'Hotels',
          image: HotelType,
        },
        {
          type: 'Villas',
          image: VillaType,
        },
        {
           type: 'Apartments',
           image: VillaType,
        }
        ,
        {
           type: 'Guesthouses',
           image: VillaType,
        }
      ];

    const [selectedHotel, setSelectedHotel] = useState(null);
    const handleClick = (hotel) => {
        setSelectedHotel(hotel);
        sessionStorage.setItem("selectedHotel", JSON.stringify(hotel));
        window.open(`/hotel/${hotel.booking_id}`);
      }

    const foundHotelType = hotelTypeImages.find(item => item.type === hotel.type)
    const hotelTypeImage = foundHotelType ? foundHotelType.image : hotelTypeImages.default;

     return (
    <div style={cardStyles} onClick={handleClick}>
      <img src={hotel.photo_url_big} alt={hotel.name} style={imageStyles} />
      <div>
        <img src={hotelTypeImage} style={faviconStyles} alt={`${hotel.type} icon`} />
        <h4 style={hotelNameStyles}>{hotel.name}</h4>
      </div>
      <div style={locationStyles}>
        {hotel.country}, {hotel.city}
      </div>
      <div>
        <span style={{ color: 'orange', fontSize: '18px' }}>{hotel.price}</span>
        <span style={{ fontSize: '18px', margin: '0' }}>{hotel.user_rating}</span>
        </div>
      </div>

  )
};

const cardListStyles = (row_items, col_items) => {
    return {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 340px))',
        gridGap: '10px'
    }
}


const CardList = ({hotels, col_items =5, row_items = 2}) => {
    if (hotels.length == 0) 
    {
        return (<div></div>)
    }
    return (
        <div style={cardListStyles(col_items, row_items)}>
            {hotels.map(hotel => (
                <Card key={hotel.id} hotel={hotel} />
            ))}
        </div>
    );
};

export default CardList;