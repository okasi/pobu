import React from 'react';
import { FaTwitter, FaInstagram } from 'react-icons/fa'

export default function About() {
  
  return (
    <>
      <div className="profile-con">
        <h1 style={{ color:'black',textDecoration: 'none', fontFamily: 'Quicksand',fontWeight: 'bold'}}>
          About
        </h1>
        <p style={{textAlign: 'right'}}> 
          <a href="https://github.com/okan-s/pobu" target="_blank" rel="noopener noreferrer">https://github.com/okan-s/pobu</a>
          <br/>
          <br/>
          Zap zap! Pobu pobu!
        </p>

        <br/>
        <span style={{textAlign: 'right'}}>
          <a href="https://www.instagram.com/pobu.io/" target="_blank" rel="noopener noreferrer" style={{color: '#000', marginRight:'5px'}}>
            <FaInstagram />
          </a>
          <a href="https://twitter.com/pobu_io/" target="_blank" rel="noopener noreferrer" style={{color: '#000'}}>
            <FaTwitter />
          </a>
        </span>
      </div>
    </>
  );
}
