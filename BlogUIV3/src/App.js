import './App.css';
import TopBar from './Components/TopBar';
import AboutMe from './Pages/AboutMe';
import ContactMe from './Pages/ContactMe';
import Home from './Pages/Home';
import NewPost from './Pages/NewPost';
import Post from './Pages/Post';
import PostUpdate from './Pages/PostUpdate';
import PostDelete from './Pages/PostDelete';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#483D8B',
    },
    secondary: {
      main: '#483D8B',
    },
  },
});

class App extends React.Component {

  constructor(props){
    super(props)
    this.state ={
        isLoggedIn: false,
        username: '',
        user_id: '',
    }
  }

  setLoginToTrue = (e) => {
    this.setState({
        isLoggedIn: true
    })
  }

setLoginToFalse =(e) =>{
    this.setState({
        isLoggedIn: false
    })
}


setNameAndId = (data) => {
    this.setState({
        username: data.username,
        user_id: data.user_id,
    })

}

  render () {
    return (
      <div className="App">      
        <Router>
        <ThemeProvider theme={theme}>
          <TopBar isLoggedIn={this.state.isLoggedIn} username={this.state.username} user_id={this.state.user_id} onLogout={this.setLoginToFalse}/>
          <Switch>
            <Route path="/about" component={AboutMe}/>
            <Route path="/contact" component={ContactMe}/>
            <Route path="/newpost" render={(props) => (<NewPost {...props} isLoggedIn={this.state.isLoggedIn} username={this.state.username}/>)}/>
            <Route path="/post/update/:id/" component={PostUpdate}/>
            <Route path="/post/delete/:id/" component={PostDelete}/>
            <Route path="/post/:id/" render={(props) => (<Post {...props} username={this.state.username}/>)}/>
            <Route path="/login" component={() => <Login onLoginSuccess={this.setLoginToTrue} changeNameAndIdOnLoginSuccess={this.setNameAndId} />}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/" component={Home}/>
          </Switch>
        </ThemeProvider>
        </Router>
      </div>
    );
  }
}

export default App;