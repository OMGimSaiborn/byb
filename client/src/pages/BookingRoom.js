import { useEffect, useState } from 'react';
import { Row, Col, Divider, DatePicker, Modal, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import { getAllRooms, rateRoom } from '../redux/actions/roomsActions';
import Spinner from '../components/Spinner';
import moment from 'moment';
import { bookRoom } from '../redux/actions/bookingActions';
import StripeCheckout from 'react-stripe-checkout';

const { RangePicker } = DatePicker;

function BookingRoom() {
  const { roomid } = useParams();
  const { rooms } = useSelector(state => state.roomsReducer);
  const { loading } = useSelector(state => state.alertsReducer);
  const [room, setRoom] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [totalNights, setTotalNights] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (rooms.length === 0) {
      dispatch(getAllRooms());
    } else {
      setRoom(rooms.find(room => room._id === roomid));
    }
  }, [rooms]);

  useEffect(() => {
    if (room && room.rentPerNight) {
      setTotalAmount(totalNights * room.rentPerNight);
    }
  }, [totalNights]);

  function selectTimeSlots(value,dateString) {
    const fromDate = moment(dateString[0], 'MMM DD YYYY HH:mm');
    const toDate = moment(dateString[1], 'MMM DD YYYY HH:mm');
    
    setFrom(fromDate.format('MMM DD YYYY HH:mm'));
    setTo(toDate.format('MMM DD YYYY HH:mm'));
    
    const totalNights = toDate.diff(fromDate, 'days');
    setTotalNights(totalNights);
  }
  
  function bookNow() {
    const reqObj = {
      user: JSON.parse(localStorage.getItem('user'))._id,
      room: room._id,
      totalNights,
      totalAmount,
      bookedTimeSlots: {
        from,
        to
      }
    };
  
    dispatch(bookRoom(reqObj));
  }

  function onToken(token) {
    console.log(token);
  }

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleRateRoom = () => {
    if (rating >= 1 && rating <= 5) {
      dispatch(rateRoom(roomid, rating));
      message.success('¡Gracias por tu calificación!');
    } else {
      message.error('Por favor, introduce una calificación válida de 1 a 5 estrellas.');
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem('bookingData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFrom(parsedData.from);
      setTo(parsedData.to);
      setTotalNights(parsedData.totalNights);
      setTotalAmount(parsedData.totalAmount);
    }
  }, []);

  useEffect(() => {
    const dataToSave = {
      from,
      to,
      totalNights,
      totalAmount
    };
    localStorage.setItem('bookingData', JSON.stringify(dataToSave));
  }, [from, to, totalNights, totalAmount]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('bookingData');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify='center' className='d-flex align-items-center' style={{ minHeight: '90vh' }}>
        <Col lg={10} sm={24} xs={24}>
          {room && <img src={room.image_url} className='roomimg2 bs1' />}
        </Col>

        <Col lg={10} sm={24} xs={24}>
          <Divider type='horizontal' dashed style={{ borderColor: 'black' }}>
            Room Info
          </Divider>
          {room && (
            <div className='text-right'>
              <p>
                {room.name}
              </p>
              {room.rentPerNight && <p>{room.rentPerNight} Rent Per Night</p>}
              <p>Max persons : {room.capacity}</p>
              <p>Locate : {room.locate}</p>
              <p>Services : {room.services} L</p>
              <p>Description : {room.description}</p>
              <p>Security features : {room.security}</p>
            </div>
          )}
          <Divider type='horizontal' dashed style={{ borderColor: 'black' }}>
            Select Time Slots
          </Divider>
          <RangePicker showTime={{ format: 'HH:mm' }} format='MMM DD YYYY HH:mm' onChange={selectTimeSlots} />
          <br />
          <button className='btn1 mt-2' onClick={() => setShowModal(true)}>
            See Booked Slots
          </button>
          {from && to && (
            <div>
              <p>
                Noches de renta: <b>{totalNights}</b>
              </p>
              {room && room.rentPerNight && (
                <p>
                  Renta por noche: <b>{room.rentPerNight} MXN</b>
                </p>
              )}
              <h3>Precio de renta total: {totalAmount} MXN</h3>
              <StripeCheckout
                shippingAddress
                token={onToken}
                amount={totalAmount * 100}
                currency='mxn'
                stripeKey="pk_test_51NI1z3BgFGILS0gqKjAuph0usZW9mK4X1eV0wRQeMBxVZQuaxNRpvWqopqVQI5ST97rRrFeNsLuZSwp6F5MVsfO900EdkMBqq9">
                <button className='btn1' onClick={bookNow} >
                  Rentar Ahora
                </button>
              </StripeCheckout>
            </div>
          )}
          <Divider type='horizontal' dashed style={{ borderColor: 'black' }}>
            Calificacion
          </Divider>
          {}
          <div className='rating-container'>
  <p>Califica el servicio (1 a 5 estrellas):</p>
  <div className='rating-input'>
    <input type='number' value={rating} onChange={e => handleRatingChange(e.target.value)} />
    <button className='btn1' onClick={handleRateRoom}>
      Calificar
    </button>
  </div>
</div>
        </Col>
      </Row>
      <Modal visible={showModal} closable={false} footer={false} title='Booked Time Slots'>
        {room && (
          <div className='p-2'>
            {room && room.bookedTimeSlots && room.bookedTimeSlots.map(slot => {
              return (
                <button className='btn1 mt-2'>
                  {slot.from} - {slot.to}
                </button>
              );
            })}
            <div className='text-right mt-4'>
              <button className='btn1' onClick={() => setShowModal(false)}>
                CLOSE
              </button>
            </div>
          </div>
        )}
      </Modal>
    </DefaultLayout>
  );
}

export default BookingRoom;
