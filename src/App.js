import {BrowserRouter as Router, Switch, Route, BrowserRouter} from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { AuthProvider, useAuth } from "./context/AuthContext";
import AppRoute from "./route/AppRoute";
import VideoCall from './components/VideoCall/VideoCall'
import React from 'react'
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/Login';
import ForgotPass from './components/auth/ForgotPass';
import Settings from './components/auth/Settings'
import CreateCall from './components/VideoCall/createCall/CreateCall';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Router>
        <Switch>
          <Route exact path='/login' component={SignIn}/>
          <Route exact path='/forgotPass' component={ForgotPass}/>
           <Route exact path='/signup' component={SignUp}/>
            <Route exact path='/forgot-pass'/>
           <AppRoute exact path='/settings' component={Settings} layout={MainLayout}/>
          <AppRoute exact path='/create' component={CreateCall} layout={MainLayout}/>
           <AppRoute exact path='/' component={VideoCall} layout={MainLayout}/>
        </Switch>
      </Router>
      </BrowserRouter>
    
      
    </AuthProvider>
  )
}

export default App
