import React from 'react';
import { Menu, Dropdown, Button, Row, Col } from 'antd';

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('user'));

  const menu = (
    <Menu>
      <Menu.Item>
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/userbookings">My Bookings</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/perfil">Perfil</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/admin">Admin</a>
      </Menu.Item>
      <Menu.Item onClick={() => {
        localStorage.removeItem('user');
        window.location.href = '/login';
      }}>
        <li>Logout</li>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className="header bs1">
        <Row gutter={16} justify='center'>
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <h1>
                <b>
                  <a href="/" className='ABC' style={{ color: 'orangered' }}>SERENE STAYS</a>
                </b>
              </h1>
              <Dropdown overlay={menu} placement="bottomCenter">
                <Button className='mt-1'>{user.username}</Button>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>

      <div className="footer bs1">
  <Row gutter={16} justify='center'>
    <Col lg={20} sm={24} xs={24}>
      <div className="d-flex justify-content-between text-center">
        <p><a href="https://abcr.foroactivo.com/">Ir al foro de sugerencias</a></p>
        <p><a href="/terminosycondiciones" target="_blank">Términos y condiciones</a></p>
      </div>
    </Col>
  </Row>
</div>
    </div>
  );
}

export default DefaultLayout;
