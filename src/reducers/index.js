import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const messages = handleActions({
  [actions.addMessageSuccess](state, { payload }) {
    console.log(state);
    console.log(payload);

    return {

    };
  },
}, { text: '' });


export default combineReducers({
  messages,
  form: formReducer,
});
