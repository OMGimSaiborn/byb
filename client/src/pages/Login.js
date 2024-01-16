import React, { useState } from 'react';
import { Row, Col, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../redux/actions/userActions';
import Spinner from '../components/Spinner';

function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.bookingsReducer);
  const [showPassword, setShowPassword] = useState(false);

  function onFinish(values) {
    dispatch(userLogin(values));
    console.log(values);
  }

  return (
    <div className='login'>
      {loading && <Spinner />}
      <Row gutter={16} className='d-flex align-items-center'>
        <Col lg={16} style={{ position: 'relative' }}>
          <img src='/images/2.png' alt='' style={{ maxWidth: '140%' }} />
          <h1 className='login-logo' style={{ fontFamily: 'Lora, serif', fontSize: '50px' }}> SERENE STAYS </h1>
        </Col>
        <Col lg={8} className='text-left p-5'>
          <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
            <h1>Login</h1>
            <hr />

            <Form.Item name='username' label='Username' rules={[{ required: true }]}>
              <Input autoComplete="off" />
            </Form.Item>
            <Form.Item
              name='password'
              label='Password'
              rules={[{ required: true }]}
            >
              <Input
                type={showPassword ? 'text' : 'password'}
                autoComplete="off"
                onMouseEnter={() => setShowPassword(true)}
                onMouseLeave={() => setShowPassword(false)}
              />
            </Form.Item>

            <button className='btn1 mt-2' type='submit'>Login</button>
            <hr />
            <Link to='/register'>Click to Register</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
