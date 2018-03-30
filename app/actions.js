/* actions */

module.exports = {
 
  ADD_MSG: 'ADD_MSG',

  add_msg: function(msg) {
    return {
      type: this.ADD_MSG,
      msg
    }
  }
  
}
