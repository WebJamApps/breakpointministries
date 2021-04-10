import React from 'react';
import { Link } from 'react-router-dom';

function Footer(): JSX.Element {
  return (
    <div className="footer">
      <div className="footer__poweredBy">
        <p>
          Website Powered By:
          {' '}
          <Link to="https://web-jam.com">Web Jam LLC</Link>
        </p>
      </div>
      <ul className="footer__social-media">
        <li>
          <Link to="https://facebook.com/#">
            <i className="fab fa-facebook" />
          </Link>
        </li>
        <li>
          <Link to="https://twitter.com/#">
            <i className="fab fa-twitter" />
          </Link>
        </li>
        <li>
          <Link to="https://linkedin.com/#">
            <i className="fab fa-linkedin" />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
