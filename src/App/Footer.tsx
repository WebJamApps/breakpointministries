import React from 'react';

function Footer(): JSX.Element {
  return (
    <div className="footer">
      <div className="footer__poweredBy">
        <p>
          Powered By:
          {' '}
          <a href="https://web-jam.com/" target="_blank" rel="noopener noreferrer">Web Jam LLC</a>
        </p>
      </div>
      <ul className="footer__social-media">
        <li>
          <a href="https://facebook.com/#" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook" />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/#" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter" />
          </a>
        </li>
        <li>
          <a href="https://linkedin.com/#" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
