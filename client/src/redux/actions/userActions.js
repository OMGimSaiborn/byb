import axios from 'axios';
import { message } from 'antd';

export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await axios.post('/api/users/login', reqObj);
    localStorage.setItem('user', JSON.stringify(response.data));
    message.success('Login Success');
    dispatch({ type: 'LOADING', payload: false });
    setTimeout(() => {    
      window.location.href = '/';
    }, 500);
  } catch (error) {
    console.log(error);
    message.error('Something went wrong');
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    await axios.post('/api/users/register', reqObj);
    message.success('Register Success');
    setTimeout(() => {
    window.location.href = '/login';
    }, 500);

    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    console.log(error);
    message.error('Something went wrong');
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const updateUserProfile = (userId, formData) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await axios.put(`/api/users/profile/${userId}`, formData);
    localStorage.setItem('user', JSON.stringify(response.data));
    dispatch({ type: 'LOADING', payload: false });
    message.success('Profile updated successfully');
    setTimeout(() => {
      dispatch(logoutUser());
    }, 500);
  } catch (error) {
    console.log(error);
    message.error('Failed to update profile');
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('user');
  dispatch({ type: 'LOGOUT' });
  window.location.href = '/login';
};