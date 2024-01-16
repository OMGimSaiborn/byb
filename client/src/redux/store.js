import { legacy_createStore as createStore} from 'redux'
import {applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { roomsReducer } from './reduces/roomsReducer';
import { alertsReducer } from './reduces/alertsReducer';
import { bookingsReducer } from './reduces/bookingsReducer';

const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
    roomsReducer,
    alertsReducer,
    bookingsReducer,
})
const store = createStore(
    rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export default store