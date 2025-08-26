// import React, { useEffect } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'

// function RefreshHandler({setIsAuthenticated}) {
//     const location = useLocation();//use location hook use to use address bar location
//     const navigate = useNavigate();//navigate function we use it

//     useEffect(()=>{
//         if(localStorage.getItem('token')){
//             setIsAuthenticated(true);
//             if(location.pathname === '/' ||
//                 location.pathname === '/login' ||
//                 location.pathname === '/signup'
//             ){
//                 navigate('/home',{replace: false});
//             }
//         }
//     },[location, navigate, setIsAuthenticated])//use effect hook ko use kr kay decesion lena ha kay kaha par redirect krna ha 
//   return (
//     null
//   )
// }

// export default RefreshHandler





import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('jwtToken')) { // ✅ Fixed key
      setIsAuthenticated(true);
      if (
        location.pathname === '/' ||
        location.pathname === '/login' ||
        location.pathname === '/signup'
      ) {
        navigate('/home', { replace: false });
      }
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
}

export default RefreshHandler;
