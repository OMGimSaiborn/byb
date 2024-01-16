import React, { useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { Row, Col } from 'antd';
import moment from 'moment';
import { getAllBookings } from '../redux/actions/bookingActions';
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';

function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const { loading } = useSelector((state) => state.bookingsReducer);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  return (
    <DefaultLayout>
      <h3 className='text-center mt-2'>My bookings</h3>
      {loading && <Spinner />}
      <Row justify='center' gutter={16}>
        <Col lg={16} sm={24}>
          {bookings
            .filter((o) => o.user === user._id)
            .map((booking) => (
              <Row gutter={16} className='bs1 mt-3 text-left' key={booking._id}>
                <Col lg={6} sm={24} className='text-left'>
                  <p>
                    <b>{booking.room.name}</b>
                  </p>
                  <p>
                    Total nights : <b>{booking.totalNights}</b>
                  </p>
                  <p>
                    Rent per nights : <b>{booking.room.rentPerNights}</b>
                  </p>
                  <p>
                    Total Amount : <b>{booking.totalAmount}</b>
                  </p>
                </Col>

                <Col lg={12} sm={24}>
                  <p>
                    Transaction ID : <b>{booking.transactionId}</b>
                  </p>
                  <p>
                    From : <b>{booking.bookedTimeSlots?.from}</b>
                  </p>
                  <p>
                    To : <b>{booking.bookedTimeSlots?.to}</b>
                  </p>
                  <p>
                    Date of booking :{' '}
                    <b>{moment(booking.createAt).format('MMM DD YYYY')}</b>
                  </p>
                </Col>

                <Col lg={6} sm={24} className='text-right'>
                  <img
                    style={{ borderRadius: 3, width: '180px' }}
                    src={booking.room.image_url}
                    alt=''
                    className='p-2'
                  />
                </Col>
              </Row>
            ))}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default UserBookings;
