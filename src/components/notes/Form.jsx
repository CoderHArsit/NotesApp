import { useState, useRef, useContext } from 'react';
import * as React from 'react';
import {collection,getDocs} from "firebase/firestore";
import { db } from '../firebase-config';
import { useEffect } from 'react';
import { Box, TextField, ClickAwayListener } from '@mui/material';
import { styled } from '@mui/material/styles';
import { v4 as uuid } from 'uuid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { DataContext } from '../../context/DataProvider';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import { addDoc } from 'firebase/firestore';
const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: auto;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    border-color: #e0e0e0;
    width: 600px;
    border-radius: 8px;
    min-height: 30px;
    padding: 10px 15px;
`

const note = {
    id: '',
    heading: '',
    text: ''
}
const pinnote = {
    id: '',
    heading: '',
    text: ''
}


const Form = () => {
    const [ notes, setNotes ] = useState([]);
    const [showTextField, setShowTextField] = useState(false);
    const [addNote, setAddNote] = useState({title:"",tagline:"",text:""});
    const [addPinNote, setAddPinNote] = useState({ ...note, id: uuid() });

    // const { setNotes } = useContext(DataContext);
    const { setPinnedNotes }=useContext(DataContext);
    const containerRef = useRef();
    const noteRef=collection(db,"note");

    useEffect(()=>{
        const getNotes=async()=>{
            const data=await getDocs(noteRef);
            console.log(data);
            setNotes(data.docs.map((docs)=>({...docs.data(),id: docs.id})))
        }
        getNotes();
    },[noteRef])
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
      const [open, setOpen] = React.useState(false);
      
    const handleClickAway = async(e) => {
        setShowTextField(false);
        containerRef.current.style.minheight = '30px'
        setAddNote({ ...note, id: uuid() });

        if (addNote.title || addNote.text) {
            await addDoc(noteRef,addNote);
            setOpen(true);
            <Snackbar open={open} autoHideDuration={6000} >
            <Alert  severity="success" sx={{ width: '100%' }}>
             This is a success message!
            </Alert>
            </Snackbar>
        }
    }
    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //       return;
    //     }
    
    //     setOpen(false);
    //   };
    const handlepin = (note) => {
        setShowTextField(false);
        containerRef.current.style.minheight = '30px'
        setAddPinNote({ ...note, id: uuid() });

        if (addPinNote.heading || addPinNote.text) {
            setPinnedNotes(prevArr => [addPinNote, ...prevArr])
        }
    }
    
    const onTextAreaClick = () => {
        setShowTextField(true);
        containerRef.current.style.minheight = '70px'
    }

    const onTextChange = (e) => {
        let changedNote = { ...addNote, [e.target.name]: e.target.value };
        setAddNote(changedNote);
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Container ref={containerRef}>
                {   showTextField && 
                    <TextField 
                        placeholder="Title"
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        style={{ marginBottom: 10 }}
                        onChange={(e) => onTextChange(e)}
                        name='title'
                        value={addNote.title}
                    />
                    
                }
                 {   showTextField && 
                    <TextField 
                        placeholder="Tagline"
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        style={{ marginBottom: 10 }}
                        onChange={(e) => onTextChange(e)}
                        name='tagline'
                        value={addNote.tagline}
                    />
                    
                }
                <TextField
                    placeholder="Take a note..."
                    multiline
                    maxRows={Infinity}
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    onClick={onTextAreaClick}
                    onChange={(e) => onTextChange(e)}
                    name='text'
                    value={addNote.text}
                />
                 <a href='#' >  <SellOutlinedIcon/></a>
                
            </Container>
        </ClickAwayListener>
    )
}

export default Form;