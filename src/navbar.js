import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link as Linkss}  from 'react-scroll';
import resume from './uploads/Ram kiran Meduri_Data_analyst.pdf'


import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

  function NavbarComponent() {
  
  
  
  return (
    <Navbar dark expand="md" style={{ backgroundImage: 'linear-gradient(to right, #49463F, rgb(45, 49, 56))' }}>
      <NavbarBrand href="#" className="gold-motion-gradient" style={{ fontFamily: 'Nunito' }}>
        RKM
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
        <Linkss to="homeSection" spy={true} smooth={true} duration={500} className="nav-link" style={{ fontWeight: 'bold', color: '#F1F1F1', fontFamily: 'Nunito' }}>
           <HomeIcon fontSize='small'/> Home
          </Linkss>
        </NavItem>
{/*
        <NavItem>
          <NavLink tag={Link} to="/admin" onClick={() => setCurrentTab('admin')} style={{ fontWeight: 'bold', color: '#ff7700', fontFamily: 'Nunito' }}>
            Admin
          </NavLink>
  
  </NavItem>
  */}
  
  
  
  
  <NavItem>
        <Linkss to="aboutSection" spy={true} smooth={true} duration={500} className="nav-link" style={{ fontWeight: 'bold', color: '#F1F1F1', fontFamily: 'Nunito' }}>
            <PersonIcon fontSize='small'/>About Me
          </Linkss>
        </NavItem>
       {(
          <NavItem>
            
           <NavLink
      href={resume}
      
      className="nav-link" style={{ fontWeight: 'bold', color: '#F1F1F1', fontFamily: 'Nunito', textDecoration: 'none', padding: ' 0.5rem 1rem' }}
      // Add any additional styling to match NavLink
    >
      <FontAwesomeIcon icon={faDownload} /> Resume
    </NavLink> 
          </NavItem>
       )}
      </Nav>
    </Navbar>
  );
}

export default NavbarComponent;
