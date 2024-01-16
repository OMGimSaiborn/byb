import axios from 'axios';
import { message } from 'antd';
export const bookRoom = (reqObj) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    await axios.post('/api/bookings/bookroom',reqObj)

    dispatch({ type: 'LOADING', payload: false });
    message.success('Your room booked successfully');
    setTimeout(() => {
      window.location.href='/userBookings'
    }, 11000);

  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
    message.error('something went wrong, please try later');
  }
};


export const  getAllBookings=()=>async dispatch=>{

    dispatch({type:'LOADING' , payload:true})

    try {
        const response = await axios.get('/api/bookings/getallbookings')
        dispatch({type: 'GET_ALL_BOOKINGS',payload:response.data})
        dispatch({type:'LOADING' , payload:false})
    } catch (error){
        console.log(error)
        dispatch({type:'LOADING' , payload:false})
    }
}