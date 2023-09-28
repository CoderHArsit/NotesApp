
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Menu,  } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import logo from "../assets/logo.png"
const Header = styled(AppBar)`
  z-index: 1201;
  background: #fff;
  height: 70px;
  box-shadow: inset 0 -1px 0 0 #dadce0;
`

const Heading = styled(Typography)`
  color: #5F6368;
  font-size: 24px;
  margin: auto;

`


const HeaderBar = ({ open, handleDrawer }) => {
  const logo1 = logo;
  
  return (
    <Header open={open}>
      <Toolbar>
        <IconButton
          onClick={() => handleDrawer()}
          sx={{ marginRight: '20px'}}
          edge="start"
        >
          <Menu />
        </IconButton><div style={{display:"flex",margin:"auto"}}>
        <img src={logo1} alt="logo" style={{width: 50, alignItems:"center",justifyContent:"center"}} />
        <Heading>NotesApp</Heading>
        </div>
        
        
      </Toolbar>
    </Header>
  )
}

export default HeaderBar;