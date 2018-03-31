const React = require('react');
const Link = require('react-router-dom').Link
const style = require('../styles/Chat');
// socket.io
const io = require('socket.io-client');
/**************************************/
const Message = require('../components/Message');

/* the Chat component that shows the chat */
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      messages: this.props.state
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSendMessage= this.handleSendMessage.bind(this);
  }
  /*******************************************************/
  // Handlers 
  /*******************************************************/
  handleChange(event) {
    this.setState({
          ["text"]:  event.target.value
           });
  }
  /***************************************/
  handleSendMessage() {
    //check if user was loged in
    let avatar_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN_4alhWCfL9T1qAwDcc5_On7j3L9jahU1ABkbfxXAlDr_pgsy";
    let username = "Anonim";
    if((localStorage.getItem("avatar_url")) && (localStorage.getItem("username"))) {
      username = localStorage.getItem("username");
      avatar_url = localStorage.getItem("avatar_url");
    }
    //get and parse new date
    let newest_date = new Date();
    let date = ((newest_date.getHours()<10?"0":"") + newest_date.getHours()) + ":" + (newest_date.getMinutes()<10?"0":"") + newest_date.getMinutes() + "  [" + ((newest_date.getDay()+25)<10?"0":"") + (newest_date.getDay()+25) + "." + ((newest_date.getMonth()+1)<10?"0":"") + (newest_date.getMonth()+1) + "." + newest_date.getFullYear() + "]";
    
    let message = {
      username: username,
      avatar_url: avatar_url,
      date: date,
      text: this.state.text
    }
    
    // send message
    const socket = io.connect();
    socket.emit("send", message);
    /********/
      const that = this;
      const xhr = new XMLHttpRequest();
      
      xhr.open('POST', '/add-message', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      
      
      let body = "username=" + encodeURIComponent(username) +
      "&avatar_url=" + encodeURIComponent(avatar_url) +
      "&date=" + encodeURIComponent(date) +
      "&text=" + encodeURIComponent(this.state.text);


      xhr.send(body);

      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 201) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);
            // listener on CONNECTION   
        }
      
      event.preventDefault();
  }
  /**************************************/
  componentWillReceiveProps(nextprops) {
    this.setState({
                ["messages"]: nextprops.state
                 });
  }
  /***************************************/
  render() {
    // construct messages
    let messages = this.state.messages.map((el) => {
          return <Message avatar_url={el.avatar_url} username={el.username} text={el.text} date={el.date} key={el.date + el.text + Math.random()}/> 
        });
    // set scroll position of DIV "messages-container"
    window.setTimeout(function() {
        let elem = document.getElementsByClassName('messages-container');
        elem[0].scrollTop = elem[0].scrollHeight;
      }, 0);
    
    // render chat
      return (
        <div className="chat">
          <div className="messages-container">
            {messages}
          </div>
          
          <div className="sent-msg-block">
            <input  id="input_msg" type="text" value={this.state.text} onChange={this.handleChange}></input>
            <button id="sent_msg" onClick={this.handleSendMessage}>send</button>
          </div>
        </div>
      );
  }
};

module.exports = Chat;