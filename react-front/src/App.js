import { AuthProvider } from 'react-auth-kit'
import Home from './Home.jsx'
import Login from './Login.jsx'
import Member from './Member.jsx'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => (
  <AuthProvider
    authType = {'cookie'}
    authName={'_auth'}
    cookieDomain={window.location.hostname}
    cookieSecure={window.location.protocol === "https:"}
  >
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/:id">
            <Member />
          </Route>
        </Switch>
      </Router>
  </AuthProvider>
);

export default App;

