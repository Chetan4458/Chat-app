import React from 'react'

import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import PrivateRoute from "./utils/PrivateRoute"
import { AuthProvider } from './context/AuthContext'

import Homepage from './views/Homepage'
import Registerpage from './views/Registerpage'
import Loginpage from './views/Loginpage'

import Navbar from './views/Navbar'

import Message from './views/Message'
import MessageDetail from './views/MessageDetail'
import SearchUser from './views/SearchUser'

function App() {
  return (
    <Router>
      <AuthProvider>
        < Navbar/>
        <Switch>
          
          <PrivateRoute component={Message} path="/inbox" exact />
          <PrivateRoute component={MessageDetail} path="/inbox/:id" exact />
          <PrivateRoute component={SearchUser} path="/search/:username" exact />
          <Route component={Loginpage} path="/login" />
          <Route component={Registerpage} path="/register" exact />
          <Route component={Homepage} path="/" exact />
          
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App