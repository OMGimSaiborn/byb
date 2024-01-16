import { message } from 'antd';
import axios from 'axios';


export const  getAllRooms=()=>async dispatch=>{

    dispatch({type:'LOADING' , payload:true})

    try {
        const response = await axios.get('/api/rooms/getallrooms')
        dispatch({type: 'GET_ALL_ROOMS',payload:response.data})
        dispatch({type:'LOADING' , payload:false})
    } catch (error){
        console.log(error)
        dispatch({type:'LOADING' , payload:false})
    }
}

export const addRoom=(reqObj)=>async dispatch=>{
    dispatch({type:'LOADING' , payload:true})

    try {
        await axios.post('/api/rooms/addroom', reqObj)
        
        dispatch({type:'LOADING' , payload:false})
        message.success('New room added successfully')
        setTimeout(() => {
            window.location.href='/admin'
        }, 500);
    } catch (error){
        console.log(error)
        dispatch({type:'LOADING' , payload:false})
    }
}

export const editRoom=(reqObj)=>async dispatch=>{
    dispatch({type:'LOADING' , payload:true})

    try {
        await axios.post('/api/rooms/editroom', reqObj)
        
        dispatch({type:'LOADING' , payload:false})
        message.success('Room details updated successfully')
        setTimeout(() => {
            window.location.href='/admin'
        }, 500);
    } catch (error){
        console.log(error)
        dispatch({type:'LOADING' , payload:false})
    }
}

export const deleteRoom=(reqObj)=>async dispatch=>{
    dispatch({type:'LOADING' , payload:true})

    try {
        await axios.post('/api/rooms/deleteroom', reqObj)
        
        dispatch({type:'LOADING' , payload:false})
        message.success('Room deleted successfully')
        setTimeout(() => {
            window.location.reload()
        }, 500);
    } catch (error){
        console.log(error)
        dispatch({type:'LOADING' , payload:false})
    }
}

export const rateRoom = (roomId, rating) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });
  
    try {
      await axios.post('/api/rooms/rateroom', { roomId, rating });
      dispatch({ type: 'RATE_ROOM', payload: { roomId, rating } });
      dispatch({ type: 'LOADING', payload: false });
      message.success('Room rated successfully');
    } catch (error) {
      console.log(error);
      dispatch({ type: 'LOADING', payload: false });
      message.error('Failed to rate room');
    }
  };