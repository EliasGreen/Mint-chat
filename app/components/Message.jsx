const React = require('react');
const Link = require('react-router-dom').Link
const style = require('../styles/Message');
/**************************************/

/* the Message component that shows the user message */
class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
      return (
        <div className="message">
           <label className="message-label">{this.props.username} <img className="avatar" src={this.props.avatar_url}></img></label>
           <div className="message-body">{this.props.text}</div>
           <div className="message-footer">{this.props.date}</div>
        </div>
      );
  }
};

module.exports = Message;