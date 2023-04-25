import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

  
class AboutContact extends React.Component {
    render() {
      return (
        <div className="about-contact">
          <h2>About Us</h2>
          <p>
          Jelly beans gummies sweet sesame snaps cupcake candy canes candy canes tootsie roll muffin. Pastry caramels dragée cake. Powder jujubes liquorice gummies dessert sweet roll cake. Fruitcake jujubes gingerbread ice cream jelly beans gummies.
          </p>
          <h3>Contact Us</h3>
          <p>Email: steph.fiona@kim.gracehopper.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <div className="social-media-icons">
          <a href="https://twitter.com/heyqueenregina" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} size="5x" />
          </a>
            <a href="https://instagram.com/heyqueenregina" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '15px' }}>
              <FontAwesomeIcon icon={faInstagram} size="5x" />
            </a>
          </div>
        </div>
      );
    }
  }


  export default AboutContact;









