import React from 'react';
import { BsGithub } from 'react-icons/bs';
import { BsLinkedin } from 'react-icons/bs';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <p className="footer-text">Connect with me:
        <a href="https://github.com/CodeFlow0" target="_blank"><BsGithub className="footer-icon bs-gh" /></a>
        <a href="https://www.linkedin.com/in/jacob-oquinn/" target="_blank"><BsLinkedin className="footer-icon bs-li" /></a>
      </p>
    </footer>
  );
}

export default Footer;
