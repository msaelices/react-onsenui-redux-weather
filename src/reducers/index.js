import {combineReducers} from 'redux';
import selectedLocation from './selectedLocation';
import locations from './locations';
import dialog from './dialog';

const weatherApp = combineReducers({
  locations,
  selectedLocation,
  dialog
});

export default weatherApp;
