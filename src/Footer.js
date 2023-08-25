import React from 'react';
import { BsGithub } from 'react-icons/bs';
import { BsLinkedin } from 'react-icons/bs';
import './Footer.css';

function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <footer>
              <p className="footer-text">Connect with me:
                <a href="https://github.com/CodeFlow0" target="_blank" className="icon-link"><BsGithub className="footer-icon bs-gh" /></a>
                <a href="https://www.linkedin.com/in/jacob-oquinn/" target="_blank" className="icon-link"><BsLinkedin className="footer-icon bs-li" /></a>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
