

import { LightbulbOutlined as Lightbulb } from '@mui/icons-material';
import { Typography, Box, styled } from '@mui/material';
import drawing from "../archives/drawin.png"
import 'animate.css';
const Light = styled(Lightbulb)`
    font-size: 120px;
    color: #F5F5F5;
`

const Text = styled(Typography)`
    color: #80868b;
    font-size: 22px
`

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin:auto
`

const EmptyNotes = () => {
    return (
        <Container>
            <img className='animate__animated animate__bounce' src={drawing} alt="error"  style={{width:300,height:300}}/>
            <Text>Add your notes here and drag them priority wise</Text>
        </Container>
    )
}

export default EmptyNotes;