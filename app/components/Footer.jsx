const React = require('react');
const Link = require('react-router-dom').Link
const style = require('../styles/Footer');
/**************************************/

/* the Footer component that shows the information about the web-app*/
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
      return (
        <div className="footer">
           <img className="mint-img" src="http://goods4u.co.nz/home/wp-content/uploads/2017/07/mint-14.jpg"></img>
        </div>
      );
  }
};

module.exports = Footer;