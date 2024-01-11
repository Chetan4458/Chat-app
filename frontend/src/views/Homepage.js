import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import jwtDecode from 'jwt-decode';
import './style/Home.css'
function Homepage() {
  const [res, setRes] = useState('');
  const [error, setError] = useState('');
  const api = useAxios();
  const token = localStorage.getItem('authTokens');

  let username = '';
  if (token) {
    const decode = jwtDecode(token);
    username = decode.username;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/test/');
        setRes(response.data.response);
      } catch (error) {
        console.log(error);
        setRes('Something went wrong');
        setError('Error fetching data. Please try again.');
      }
    };

    fetchData();
  }, [api]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await api.post('/test/');
        setRes(response.data.response);
      } catch (error) {
        console.log(error);
        setRes('Something went wrong');
        setError('Error fetching data. Please try again.');
      }
    };

    fetchPostData();
  }, [api]);


  return (
    <div className="container-fluid" style={{ paddingTop: '100px' }}>
      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
        {token ? (
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 className="h2">Welcome to Real-Time Chat Application {username}!!</h1>
          </div>
        ) : (
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 className="h2">Welcome to Real-Time Chat Application!</h1>
          </div>
        )}
        {error ? (
          <div className='pt-4'>
            <h2>Please log in to view content</h2>
          </div>
        ) : (
          <div className="pt-4">
            <h1 className="h2">{res}</h1>
          </div>
        )}
        
        <div className="pb-2 mb-3 border-bottom">
          <p>      
              Experience seamless and instant communication with my Real-Time Chat Application powered by Django and ReactJS. Connect with friends, colleagues, and loved ones in real-time, no matter where they are.<br/>
          </p>
          
          <strong><p>Key Features:</p></strong>
        <p> 

            1. Real-Time Messaging: Enjoy the thrill of real-time messaging with instant message delivery. <br/>
            2. User-Friendly Interface: Our intuitive and sleek interface ensures a smooth and enjoyable chat experience. <br/>
            3. Secure and Private: We prioritize your privacy and use encryption to keep your conversations secure. <br/>
            4. Responsive Design: Our chat application is designed to be responsive, providing an optimal experience across devices. <br/><br/>            
         
            
            Experience the power of <strong>Django and ReactJS ,</strong> delivering a robust and dynamic real-time chat experience.<br/>
          </p>
          </div>
      </main>
    </div>
  );
}

export default Homepage;
