import { useContext } from 'react';

import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';
// import SellIcon from '@mui/icons-material/Sell';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import { DataContext } from '../../context/DataProvider';
import {collection,deleteDoc,doc,getDocs} from "firebase/firestore";
import { db } from '../firebase-config';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useState ,useEffect} from 'react';
import { addDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 400px;
    margin: 15px;
    
    box-shadow: none;
`


const Note = ({ note }) => {

    const { setAcrchiveNotes, setDeleteNotes,setPinnedNotes } = useContext(DataContext);
    const [ notes, setNotes ] = useState([]);
    const [addNote, setAddNote] = useState({title:"",tagline:"",text:""});
    const noteRef=collection(db,"note");
    const pinRef=collection(db,"pin");
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
    const archiveNote = (note) => {
        const updatedNotes = notes.filter(data => data.id !== note.id);
        setNotes(updatedNotes);
        setAcrchiveNotes(prevArr => [note, ...prevArr]);
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
    }
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
                        onClick={() => archiveNote(note)}
                    />
                    <Delete 
                        fontSize="small"
                        onClick={() => deleteNote(note.id)}
                    />
                      <SellOutlinedIcon
                        fontSize="small"
                        onClick={() => pinnedNotes(note)}
                    />
                </CardActions>
        </StyledCard>
    )
}

export default Note;