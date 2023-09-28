import { useState } from 'react';
// import Grow from '@mui/material/Grow';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DragDropContext, Draggable, Droppable  } from 'react-beautiful-dnd';
import 'animate.css';
import { useEffect } from 'react';
// import { DataContext } from '../../context/DataProvider';
import { reorder } from '../../utils/common-utils';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import Alert from '@mui/material/Alert';
// import Snackbar from '@mui/material/Snackbar';
import {collection,getDocs} from "firebase/firestore";
import { db } from '../firebase-config';
// import {collection,getDocs} from "firebase/firestore";
import PinNote from './PinNote';
//components
import Form from './Form';
import Note from './Note';
import EmptyNotes from './EmptyNotes';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Notes = () => {

    const [ notes, setNotes ] = useState([]);
    const [pin,setPin]=useState([]);
    const pinRef=collection(db,"pin");
    const noteRef=collection(db,"note");
     
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
            setPin(data.docs.map((docs)=>({...docs.data(),id: docs.id})))
        }
        getNotes();
    },[pinRef])
    // const [pinnedNotes,setPinnedNotes]=useContext(DataContext);
    // const [deleteNotes, setDeleteNotes] = useContext(DataContext);
    const onDragEnd = (result) => {
        if (!result.destination) 
          return;
    
        const items = reorder(notes, result.source.index, result.destination.index);    
        setNotes(items);
    }
    
    const [currentPage,setCurrentPage]=useState(1);
    const recordsPerPage=6;
    const lastIndex=currentPage*recordsPerPage;
    const firstIndex=lastIndex-recordsPerPage;
    const records=notes.slice(firstIndex,lastIndex);
    const npage=Math.ceil(notes.length/recordsPerPage)
    const numbers=[...Array(npage+1).keys()].slice(1) 
    // console.log(notes);
    // console.log(npage);
    // console.log(numbers);
    // console.log(pinnedNotes);
    function prePage(){
        if(currentPage !== 1){
            setCurrentPage(currentPage-1);
        }
        else {
           
        }
        
        
           }       function changeCPage(id){
        setCurrentPage(id);
        }
        function nextPage(){
        if(currentPage !== npage ){
            setCurrentPage(currentPage+1)
        }
        }
        // const deleteNote=async(id)=>{
        //     const deletenote=doc(noteRef,id)
        //     await deleteDoc(deletenote);
        // }
        
    return (
        <Box sx={{ display:"flex-column" , width: '100%' ,padding:"auto",marginTop:"40px"  }}>
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                <Form />
                <div>
                    {
                        pin.length!==0 ?
                        <Grid container style={{ marginTop: 16 , display:"flex",flexDirection:"column",justifyContent:"center"}}
                      >  <h4>Pinned Notes</h4>
                                 <div style={{display:"flex",justifyContent:"center"}}>   
                                {
                                  pin && pin.map((pin) => (
                                            <div >
                                                <Grid className="animate__animated animate__bounce" 
                                                    style={{margin:'auto'}}>
                                                    <PinNote note={pin} id={pin.id}  />
                                                </Grid>
                                                </div> ))
                                }  </div>
                                </Grid>
                         : " "
                    }
                </div>
<hr/>
                 <div >
               { notes.length===0  && pin.length===0?  
                 <EmptyNotes /> :
                  <Grid container style={{ marginTop: 16 , display:"flex",flexDirection:"column",justifyContent:"center"}}
                      >  <h4>Pinned Notes</h4>
                                 <div style={{display:"flex",justifyContent:"center"}}>   
                                {
                                  records && records.map((note) => (
                                            <div >
                                                <Grid className="animate__animated animate__bounce" 
                                                    style={{margin:'auto'}}>
                                                    <Note note={note} id={note.id}  />
                                                </Grid>
                                                </div> ))
                                }  </div>
                                </Grid>
                
             }
                </div>

                
            </Box><div style={{margin:"auto"}}>{
                notes.length===0  && pin.length===0?" ":
            <nav style={{display:"flex",justifyContent:"center"}}>
            <ul className='pagination'>
                <li className='page-item'>
                    <a href='#' style={{border:"3px solid blue",borderRadius:"30px",marginRight:"10px"}} className='page-link' onClick={prePage}><ArrowBackIosIcon/></a>
                </li>
                {
                    numbers.map((n,i)=>(
                        <li className={`page-link ${currentPage == n ? 'active' : ''}`}key={i} style={{textDecoration:"none",border:"1px solid blue",width:"40px",display:"flex",justifyContent:"center",borderRadius:"90px",margin:"3px"}}>
                            <a href='#' className='page-item' 
                            onClick={()=>changeCPage(n)} style={{textDecoration:"none", color:"black"}}>{n}</a>
                        </li>
                    ))
                }
                <li >
                    <a  href='#' className={`page-link `} style={{border:"3px solid blue",borderRadius:"30px",marginLeft:"10px"}}
                    onClick={nextPage}><ArrowForwardIosIcon/></a>
                </li>

            </ul>
            
            </nav>
}
            </div>
           
        </Box>
    )
}

export default Notes;
