import './App.css';
import MiniDrawer from './components/drawer'
import SignIn from './components/SignUp/login'
import SignUp from './components/SignUp/signUp'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { useState } from 'react';

function App() {
  const [ user, setLoginUser] = useState({})
  return (
    
  <Router>
  <Switch>
    <Route exact path="/">
      {
        user && user._id ? <MiniDrawer setLoginUser={setLoginUser} /> : <SignIn setLoginUser={setLoginUser}/>
      }
    </Route>
    <Route path="/login">
      <SignIn setLoginUser={setLoginUser}/>
    </Route>
    <Route path="/register">
      <SignUp />
    </Route>
  </Switch>
</Router>
  );
}

export default App;
