import React, { useState, useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRooms } from '../redux/actions/roomsActions';
import { Row, Col, DatePicker, Button } from 'antd';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import moment from 'moment';
import { Rate } from 'antd';

const { RangePicker } = DatePicker;

function Home() {
  const { rooms } = useSelector((state) => state.roomsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalRooms, setTotalRooms] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRooms());
  }, []);

  useEffect(() => {
    setTotalRooms(rooms);
  }, [rooms]);

  function setFilter(dateString) {
    setSelectedDate(dateString);
  }

  useEffect(() => {
    if (selectedDate) {
      var selectedFrom = moment(selectedDate[0]);
      var selectedTo = moment(selectedDate[1]);

      var temp = [];

      for (var room of rooms) {
        if (room.bookedTimeSlots.length === 0) {
          temp.push(room);
        } else {
          var conflict = false;
          for (var booking of room.bookedTimeSlots) {
            if (
              selectedFrom.isBetween(booking.from, booking.to) ||
              selectedTo.isBetween(booking.from, booking.to) ||
              moment(booking.from).isBetween(selectedFrom, selectedTo) ||
              moment(booking.to).isBetween(selectedFrom, selectedTo)
            ) {
              conflict = true;
              break;
            }
          }
          if (!conflict) {
            temp.push(room);
          }
        }
      }

      setTotalRooms(temp);
    }
  }, [selectedDate, rooms]);

  return (
    <DefaultLayout>
      <Row className='mt-3' justify='center'>
        <Col lg={20} sm={24} className='d-flex justify-content-left'>
          <RangePicker showTime={{ format: 'HH:mm' }} format='MMM DD YYYY HH:mm' onChange={setFilter} />
        </Col>
      </Row>

      {loading && <Spinner />}
      {selectedDate && selectedDate.length > 0 ? (
      <Row justify='center' gutter={16}>
        {totalRooms.map((room) => (
          <Col lg={5} sm={24} xs={24} key={room._id}>
            <div className='room p-2 bs1'>
              <img src={room.image_url} className='roomimg center-image fixed-image' />

              <div className='room-content d-flex align-items-center justify-content-between'>
                <div className='text-left pl-2'>
                  <p>{`${room.name}`}</p>
                  <p>{`Rent per night: ${room.rentPerNight} MXN`}</p>
                  <Rate value={room.rate} disabled />
                </div>

                <div>
                  <Button className='btn1 mr-2'>
                    <Link to={`/booking/${room._id}`}>Rent</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
        ) : (
          <p>Selecciona una fecha para mostrar las habitaciones disponibles.</p>
        )}
    </DefaultLayout>
  );
}

export default Home;
