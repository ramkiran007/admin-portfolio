import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
//import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for routing
import { Link}  from 'react-scroll';
import {
  MDBFooter,
  MDBContainer,
  
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter className='footer text-center footer-link'>
      <MDBContainer className='p-4 pb-0'>
         {/* Left Section for Email and Phone */}
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

         <div>
       
            <p><MDBIcon  icon="envelope" /> ramkiranmeduri.3@gmail.com</p>
            
            <p><MDBIcon icon="phone" /> +1 937-212-7742</p>
          </div>
        <section className='mb-4'>
            
          <MDBBtn
            floating
            className='m-1'
            
            style={{ backgroundColor: '#3b5998', fontSize: '24px', padding: '3px' }} // Adjust fontSize and padding as needed

            href='https://www.facebook.com/ramkiran888'
            role='button'
          >
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#dd4b39' ,fontSize: '24px', padding: '3px'}}
            href='http://mail.google.com'
            role='button'
          >
            <MDBIcon fab icon='google' />
          </MDBBtn>
          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#ac2bac' ,fontSize: '24px', padding: '3px'}}
            href='https://www.instagram.com/itsmeramki?igsh=MWtqZnE2aW1sd3lsbA%3D%3D&utm_source=qr'
            role='button'
          >
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#0082ca',fontSize: '24px', padding: '3px' }}
            href='https://www.linkedin.com/in/ramkiran-meduri'
            role='button'
          >
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#333333',fontSize: '24px', padding: '3px' }}
            href='https://github.com/ramkiran007'
            role='button'
          >
            <MDBIcon fab icon='github' />
          </MDBBtn>
          

        </section>
        <Link to="aboutSection" className="footer-links">About</Link>
        </div>
      </MDBContainer>
     

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © Copyright All Rights Reserved 2024
       
        <p>Developed By Ram Kiran Meduri</p>

      </div>
    </MDBFooter>
  );
}