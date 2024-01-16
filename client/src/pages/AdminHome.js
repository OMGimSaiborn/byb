import React, { useState, useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { deleteRoom, getAllRooms} from '../redux/actions/roomsActions'
import { Row, Col, Divider, DatePicker, Checkbox, Button, Edit} from 'antd';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import moment from 'moment';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { message, Popconfirm } from 'antd';

const { RangePicker } = DatePicker;

function AdminHome() {
    const { rooms } = useSelector(state => state.roomsReducer)
    const { loading } = useSelector(state => state.alertsReducer)
    const [totalRooms, setTotalRooms] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllRooms())
    }, [])

    useEffect(() => {
        setTotalRooms(rooms)
    }, [rooms])



    return (
        <DefaultLayout>

            <Row justify='center' gutter={16}>

                <Col lg={20} sm={24}>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h3 className='mt-1'>Admin Panel</h3>
                        <button className='btn1 mt-3'>
                            <a href='/showstats' style={{ textDecoration: 'none' }}>Show Stats</a>
                        </button>
                        <button className='btn1 mt-3'>
                            <a href='/addroom' style={{ textDecoration: 'none' }}>ADD ROOM</a>
                        </button>
                    </div>
                </Col>

            </Row>

            {loading === true && (<Spinner />)}

            <Row justify='center' gutter={16}>

                {totalRooms.map(room => (
                    <Col lg={5} sm={24} xs={24} key={room._id}>
                        <div className='room p-2 bs1'>
                            <img src={room.image_url} className='roomimg center-image fixed-image' />

                            <div className='room-content d-flex align-items-center justify-content-between'>
                                <div className='text-left pl-2'>
                                    <p>{`${room.name}`}</p>
                                    <p>{`Rent per day : ${room.rentPerNight} MXN`}</p>
                                </div>

                                <div className='mr-4'>
                                    <Link to={`/editRoom/${room._id}`}><EditOutlined className='mr-3' style={{ color: 'green', cursor: 'pointer' }} /></Link>
                                    <Popconfirm
                                        title="Delete the task"
                                        description="Are you sure to delete this room?"
                                        onConfirm={()=>{dispatch(deleteRoom({roomid : room._id}))}}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
                                    </Popconfirm>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </DefaultLayout>
    )
}

export default AdminHome;
