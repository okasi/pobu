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
          Zap zap! Pobu pobu!
          <br/>
          pobu pobu pobu pobu pobu!
        </p>
        <br/>
        <span style={{textAlign: 'right'}}>
          <a href="http://twitter.com/pobu_io/" target="_blank" rel="noopener noreferrer" style={{color: '#000', marginRight:'5px'}}>
            <FaInstagram />
          </a>
          <a href="http://twitter.com/pobu_io/" target="_blank" rel="noopener noreferrer" style={{color: '#000'}}>
            <FaTwitter />
          </a>
        </span>
      </div>
    </>
  );
}
