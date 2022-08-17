import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

import Profile from './pages/Profile';
import Auth from './pages/Auth';

function App() {
  return (
    <Container>
      <Router>
        <Route path='/' exact component={Auth} />
        <Route path='/profile' exact component={Profile} />
      </Router>
    </Container>
  );
}

export default App;
