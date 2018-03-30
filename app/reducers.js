/* reducers */

const {ADD_MSG} = require('./actions');

function messages(state = [], action) {
  switch (action.type) {
    case ADD_MSG:
        state =  Object.values(state);
        state.push(action.msg);
      return Object.assign([], state);  
    default:
      return state;
  }
}

module.exports = messages