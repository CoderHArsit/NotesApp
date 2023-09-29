import * as React from 'react';
import {Box, ClickAwayListener,TextField} from '@mui/material';
import Modal from '@mui/material/Modal';
import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import {  DeleteOutlineOutlined as Delete, TurnLeftTwoTone } from '@mui/icons-material';
// import SellIcon from '@mui/icons-material/Sell';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import {collection,deleteDoc,doc,getDocs, updateDoc} from "firebase/firestore";
import { db } from '../firebase-config';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useState ,useEffect,useRef} from 'react';
import { addDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';




const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 400px;
    margin: 15px;
    
    box-shadow: none;
`

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const Note = ({ note }) => {


    const [ , setNotes ] = useState([]);
    const [addNote, setAddNote] = useState({title:"",tagline:"",text:""});
    const [id,setId]=useState("");
    const noteRef=collection(db,"note");
    const pinRef=collection(db,"pin");
    const Container = styled(Box)`

    display: flex;
    flex-direction: column;
    margin: auto;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    border-color: #e0e0e0;
    width: 300px;
    border-radius: 8px;
    min-height: 30px;
    padding: 10px 15px;
`
const handleClickAway = async(e) => {
    setShowTextField(false);
    containerRef.current.style.minheight = '30px'
    setAddNote({ ...note, id: uuid() });

    if (addNote.title || addNote.text) {
        await addDoc(noteRef,addNote);
    }
}
// const onTextAreaClick = () => {
//     setShowTextField(true);
//     containerRef.current.style.minheight = '70px'
// }
const [showTextField, setShowTextField] = useState(false);
    // const [addNote, setAddNote] = useState({title:"",tagline:"",text:""});


const containerRef = useRef();
    useEffect(()=>{
        const getNotes=async()=>{
            const data=await getDocs(noteRef);
            console.log(data);
            setNotes(data.docs.map((docs)=>({...docs.data(),id: docs.id})))
        }
        getNotes();
    },[noteRef])
    useEffect(()=>{
        const getNotes=async()=>{
            const data=await getDocs(pinRef);
            console.log(data);
            setNotes(data.docs.map((docs)=>({...docs.data(),id: docs.id})))
        }
        getNotes();
    },[pinRef])
    const onTextChange = (e) => {
         const name=e.target.name;
         const value=e.target.value;
        setAddNote({...addNote,[name]:value});
    }
    const [open1, setOpen1] = React.useState(false);

    const [open2, setOpen2] = React.useState(false);
  
    const handleClose1 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen1(false);
    };
  
    const handlepin = async(e) => {
        setShowTextField(false);
        containerRef.current.style.minheight = '30px'
        setAddNote({ ...note, id: uuid() });
    
        if (addNote.title || addNote.text) {
            await addDoc(pinRef,addNote);
            setOpen(false);
            const deletenote=doc(noteRef,id)
            
            await deleteDoc(deletenote);
        }
    }
    const [open, setOpen] = React.useState(false);
    const handleedit = (note) =>{ setOpen(true);
     console.log(note.id);
     setAddNote({title:note.title,tagline:note.tagline,text:note.text})
    
    }
    const handleClose = () => setOpen(false);
    const updatedNote=async(note)=>{
        const updatenote = doc(db,"note",note.id)
        await updateDoc(updatenote,addNote)
        setOpen(false);
        setOpen1(true);
    }
    const pinnedNotes = async(e) => {
        setAddNote({ ...note, id: uuid() });

        if (addNote.title || addNote.text) {
            await addDoc(pinRef,addNote);
            const deletenote=doc(noteRef,e.id)
        
            await deleteDoc(deletenote);
        }

    }

    // const deleteNote = (note) => {
    //     // const updatedNotes = notes.filter(data => data.id !== note.id);
    //     // setNotes(updatedNotes);
    //     // setDeleteNotes(prevArr => [note, ...prevArr]);
    //     console.log(note.id)
    //     // note.getId(note.id);
    // }

    const deleteNote=async(id)=>{
        const deletenote=doc(noteRef,id)
        
        await deleteDoc(deletenote);
        setOpen2(true);

    }
    const handleClose2=()=> {setOpen2(false)};
    return (
        <StyledCard>
             
                <CardContent>
                    <Typography style={{fontSize:"20px",font:"bold"}}>{note.title}</Typography>
                    <Typography style={{color:"#ab9d9d"}}>{note.tagline}</Typography>
                    <Typography>{note.text}</Typography>
                   
                    
                </CardContent>
                <CardActions>
                   
                    <BorderColorOutlinedIcon
                        fontSize="small" 
                        style={{ marginLeft: 'auto' }} 
                        onClick={() => handleedit(note)}
                    />
                   
                    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    
      ><Box sx={style}>
   
            <Container ref={containerRef}>
           
                    <TextField 
                        placeholder="Title"
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        style={{ marginBottom: 10 }}
                        onChange={onTextChange}
                        name='title'
                        value={addNote.title}
                    />
                    
              
                    <TextField 
                        placeholder="Tagline"
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        style={{ marginBottom: 10 }}
                        onChange={onTextChange}
                        name='tagline'
                        value={addNote.tagline}
                    />
                    
                
                <TextField
                    placeholder="Take a note..."
                    multiline
                    maxRows={Infinity}
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    
                    onChange={onTextChange}
                    name='text'
                    value={addNote.text}
                />
                <div style={{display:"flex"}}>
                 <a href='#' onClick={handlepin}>  <SellOutlinedIcon/></a>
                <a> <button style={{margin:"0px 10px",border:"1px solid blue",background:"#6499E9",fontWeight:"12px",borderRadius:"20px",font:"#12486B"}} onClick={()=>updatedNote(note)}>Update</button></a>
               
                 </div>
            </Container>
        
        </Box>
      </Modal>

                    <Delete 
                        fontSize="small"
                        onClick={() => deleteNote(note.id)}
                    />
                      <SellOutlinedIcon
                        fontSize="small"
                        onClick={() => pinnedNotes(note)}
                    />
                </CardActions>
                <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
          Updated successfully
        </Alert>
      </Snackbar>
    
        </StyledCard>
    )
}

export default Note;