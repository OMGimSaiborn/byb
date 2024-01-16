import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
import DefaultLayout from '../components/DefaultLayout';
import { updateUserProfile } from '../redux/actions/userActions';
import { useDispatch } from 'react-redux';

function Perfil() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    number: '',
    password: ''
  });

  // Lógica para obtener los datos del usuario del almacenamiento local o del servidor
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({
        username: parsedUser.username,
        fullname: parsedUser.fullname,
        email: parsedUser.email,
        number: parsedUser.number,
        password: ''
      });
    } else {
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/users/profile');
      const userData = response.data;
      setUser(userData);
      setFormData({
        username: userData.username,
        fullname: userData.fullname,
        email: userData.email,
        number: userData.number,
        password: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedProfile = {
      username: formData.username,
      fullname: formData.fullname,
      email: formData.email,
      number: formData.number,
      password: formData.password
    };
  
    try {
      await dispatch(updateUserProfile(user._id, updatedProfile));
      message.success('Profile updated successfully');
    } catch (error) {
      console.error(error);
      message.error('Failed to update profile');
    }
  };

  return (
    <DefaultLayout>
    <div>
      <h1>Perfil</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de usuario:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Nombre completo:
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
          />
        </label>
        <label>
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Número de teléfono:
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
    </DefaultLayout>
  );
}

export default Perfil;
