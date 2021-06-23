import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core'
import Container from '@material-ui/core/Container';
import Axios from 'axios';
import Room from "./Room";
import { useAuth } from '../../context/AuthContext';
import {useHistory} from 'react-router-dom'
import { db } from '../../firebase/firebase';
import { firebaseLooper } from '../../utils/tools';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
//import "./App.css"
function Copyright() {
  return (
  null
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'blue',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function VideoCall() {
  const classes = useStyles();
  const [logged, setLogged] = React.useState(false);
  const [roomName,setRoomName]=React.useState("");
  const [meeting, setMeeting] = useState([])
  
  const [meeting_password,setMeetingPassword]=React.useState("")
   const {currentUser, logout} = useAuth()
  const [error, setError] = useState('')
  const history = useHistory()
  useEffect(() => {
	db.collection('videoCallHistory').onSnapshot( snapshot => {
		const data = firebaseLooper(snapshot)
		setMeeting(data)
		console.log(data)
	})
  }, [])

   async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  const authenticate = (e) => {
    e.preventDefault();
    {/* condition to check if meeting exists */}
    meeting.filter(data => {
	    if(data.roomName.toLowerCase().includes(roomName.toLocaleLowerCase()) && data.roomPass.toLowerCase().includes(meeting_password.toLocaleLowerCase())){
		    setLogged(true)
	    }
	    else {
		    setError("meeting Doesn't exist")
	    }
    })
  }
 	  
		   if (logged) {
	  
		return <Room meeting_password={meeting_password} roomName={roomName} />
		}

 
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
	      <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '5%', padding: '2%'}}>
		      <Button variant='contained' color='secondary'><a style={{textDecoration: 'none', color: 'white'}} href='/create'>Create a room</a></Button>
	      </div>
	      <br />
	      <Toolbar style={{display: 'flex', justifyContent: 'space-evenly'}}>
		   <Button onClick={handleLogout}>Logout</Button>   
		   <Button><a href='/settings' style={{textDecoration: 'none'}}>Settings</a></Button>
	      </Toolbar>
        <Avatar className={classes.avatar}>
          <BubbleChartIcon  />
        </Avatar>
        <Typography component="h1" variant="h5">
          Join with credentials
        </Typography>
	{error && <b style={{color: 'red'}}>{error}</b>}
        <form className={classes.form} noValidate onSubmit={(e) => authenticate(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label=" Room Name"
            autoFocus
            onChange={(e) => setRoomName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label=" Meeting Password"
            type="password"
            onChange={(e) => setMeetingPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           Join
          </Button>

        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}