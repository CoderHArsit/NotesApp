
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { useState } from 'react';
//components
import SwipeDrawer from './SwipeDrawer';
import Notes from './notes/Notes';
import Archives from './archives/Archives';
import DeleteNotes from './delete/DeleteNotes';

const Home = () => {
    const [mode, setMode]=useState('light');//whether dark mode is enabled or not
  const toggleMode=()=>{
    if(mode==='light'){
      setMode('dark')
      document.body.style.backgroundColor='black'
    //   showAlert("Dark mode  has been enabled ","success")
    }
    else{
      setMode('light')
      document.body.style.backgroundColor='white'
    //   showAlert("light mode  has been enabled ","success")
    }
  }
    return (
        <Box style={{ display: 'flex', width: '100%' }}>
            <Router>
                <SwipeDrawer />
                <Routes>        
                    <Route path='/' element={<Notes />} />
                    <Route path='/archive' element={<Archives />} />
                    <Route path='/delete' element={<DeleteNotes />} />
                </Routes>
            </Router>
        </Box>
    )
}

export default Home;