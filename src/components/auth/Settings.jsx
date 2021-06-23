import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuth } from '../../context/AuthContext';
import {useHistory} from 'react-router-dom'
import { firebaseLooper } from '../../utils/tools';
import { db } from '../../firebase/firebase';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/login">
       B Sai Rohit
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
     const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')
    const { currentUser, updatePassword, updateEmail } = useAuth()
   const [message, setMessage] = useState("")
   const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState('')

  useEffect(() => {
    db.collection('users').where('email', '==', currentUser.email ).onSnapshot(snapshot => {
      const accountData = firebaseLooper(snapshot)
      setEmail(accountData[0].email)
     
      setId(accountData[0].id)
      
    })
  })

  async function handleSubmit(e) {
        e.preventDefault()
    if (password !== passwordConfirm) {
      return setError("Passwords do not match! Please try again")
    }

      if (password.length <= 6){
        if(password.length === 0){
          history.push('/')
        }
      return setError("Weak Password !")
    }

    if (email !== currentUser.email) {
     updateEmail(email)
     history.push('/')
    }
    setLoading(true)
    setError("")
     db.collection('users').doc(id).update({password})
    if(password === passwordConfirm){
	    try {
      await 
       updatePassword(password)
      
       history.push("/")
    } catch (error) {
        setError("Failed to change password")
    }
    }
    

    
  }
   

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         Settings
        </Typography>
	{error && <b style={{color:'red'}}>{error}</b>}
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
	  value={email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
	    onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
	  
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
	    onChange={(e) => setPassword(e.target.value)}
          />
	   <TextField
	  value={passwordConfirm}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm Password"
            type="password"
            id="password"
            autoComplete="current-password"
	    onChange={(e) => setPasswordConfirm(e.target.value)}
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           Submit
          </Button>
          
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}