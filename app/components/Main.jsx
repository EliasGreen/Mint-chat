const React = require('react');
const Link = require('react-router-dom').Link
const style = require('../styles/Main');
/**************************************/
const ChatCtrl = require('../controllers/ChatCtrl');
const Footer = require('../components/Footer');

/* the Main component for the index route of this app */
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
      return (
        <div className="main">
           <ChatCtrl/>
           <Footer/>
        </div>
      );
  }
};

module.exports = Main;