import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Row, Col, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { addRoom } from '../redux/actions/roomsActions';
import Spinner from '../components/Spinner';

function AddRoom() {

    const dispatch = useDispatch()
    const {loading} = useSelector(state=>state.alertsReducer)

    function onFinish(values){

        values.bookedTimeSlots=[]

        dispatch(addRoom(values))
        console.log(values)
    }
  return (
    <DefaultLayout>
        {loading && (<Spinner />)}
        <Row justify='center mt-5'>
            <Col lg={12} sm={24}>
                <Form className='bs1 p-2' layout='vertical' onFinish={onFinish}>
<h3>Add new room</h3>
                    <Form.Item name='name' label='Room name' rules={[{required : true}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='image_url' label='Image url' rules={[{required : true}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='locate' label='Locate' rules={[{required : true}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='security' label='Security features' rules={[{required : true}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='description' label='Description' rules={[{required : true}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='rentPerNight' label='Rent per night' rules={[{required : true}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='capacity' label='Capacity' rules={[{required : true}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='services' label='Services' rules={[{required : true}]}>
                        <Input />
                    </Form.Item>                    
                    <div className='text-right'>
                        <button className='btn1'>Add Room</button>
                    </div>
                </Form>
            </Col>
        </Row>
    </DefaultLayout>
  )
}

export default AddRoom