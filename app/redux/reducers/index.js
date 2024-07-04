import { reducer as formReducer } from 'redux-form';
/**
 *  Import node modules
 */
import { combineReducers } from 'redux';

/**
 *  Import reducers
 *  All reducers used in the app must be declared here!
 */
import users from './users.reducer';
import orders from './orders.reducer';
import reservations from './reservations.reducer';
import ringTones from './ringtones.reducer';
import grievance from './grievance.reducer';
import customers from './customers.reducer';
import restaurants from './restaurants.reducer';
import dishes from './dishes.reducer';
import services from './services.reducer';
import greetings from './greetings.reducer'

/**
 *  Combine the reducers
 */
const reducers = combineReducers({
	form: formReducer,
	users,
	orders,
	reservations,
	ringTones,
	grievance,
	customers,
	restaurants,
	dishes,
	services,
	greetings
});


/**
 *  Export the combined reducers
 */
export default reducers;
