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
    const noteRef=collection(db,"note");

    useEffect(()=>{
        const getNotes=async()=>{
            const data=await getDocs(noteRef);
            console.log(data);
            setNotes(data.docs.map((docs)=>({...docs.data(),id: docs.id})))
        }
        getNotes();
    },[noteRef])
    const archiveNote = (note) => {
        const updatedNotes = notes.filter(data => data.id !== note.id);
        setNotes(updatedNotes);
        setAcrchiveNotes(prevArr => [note, ...prevArr]);
    }
    const pinnedNotes = (note) => {
        const updatedNotes = notes.filter(data => data.id !== note.id);
        setNotes(updatedNotes);
        setPinnedNotes(prevArr => [note, ...prevArr]);
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