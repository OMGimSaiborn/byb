import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Row, Col, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { editRoom } from '../redux/actions/roomsActions';
import { getAllRooms } from '../redux/actions/roomsActions';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';


function EditRoom({ match }) {
    const { roomid } = useParams();
    const { rooms } = useSelector(state => state.roomsReducer)
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.alertsReducer)
    const [room, setRoom] = useState()
    const [totalRooms , setTotalRooms] = useState([])

    useEffect(() => {

        if (rooms.length === 0) {
            dispatch(getAllRooms())
        }
        else { 
            setTotalRooms(rooms)
            setRoom(rooms.find(room => room._id === roomid))
        }
    }, [rooms])

    function onFinish(values) {

        values._id= room._id

        dispatch(editRoom(values))
        console.log(values)
    }
    return (
        <DefaultLayout>
            {loading && (<Spinner />)}
            <Row justify='center mt-5'>
                <Col lg={12} sm={24}>
                    {totalRooms.length > 0 && (<Form initialValues={room} className='bs1 p-2' layout='vertical' onFinish={onFinish}>
                        <h3>Edit room</h3>
                        <h1>{room.name} </h1>
                        {room.length}
                        <hr />
                        <Form.Item name='name' label='Room name' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='image_url' label='Image url' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='locate' label='Locate' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='services' label='Services' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='security' label='Security features' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='description' label='Description' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='rentPerNight' label='Rent per night' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='capacity' label='Capacity' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <div className='text-right'>
                            <button className='btn1'>Edit Room</button>
                        </div>
                    </Form>)}
                </Col>
            </Row>
        </DefaultLayout>
    )
}

export default EditRoom