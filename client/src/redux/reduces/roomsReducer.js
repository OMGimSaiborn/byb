const initialState = {
  rooms: [],
  loading: false,
};

export const roomsReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case 'GET_ALL_ROOMS':{
            return{
                ...state,
                rooms : action.payload
            }
        }

    case 'RATE_ROOM':
      const { roomId, rating } = action.payload;
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room._id === roomId ? { ...room, rate: rating } : room
        ),
      };

    default: return state;
  }
};

