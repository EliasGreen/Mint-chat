const { connect } = require('react-redux');
const actions = require('../actions');
const Chat = require('../components/Chat');
/**************************************************/
/**************************************************/
/*               Chat Controller                  */
/**************************************************/
/**************************************************/
const mapStateToProps = function(state) {
  return {
    state
  };
}

const mapDispatchToProps = function(dispatch) {
  return {
    add_msg: function(msg) {
      dispatch(actions.add_msg(msg))
    }
  }
}

const ChatCtrl = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

module.exports = ChatCtrl;