import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import setAuthToken from "./utils/setAuthToken";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import { loadUser } from "./actions/auth";
//Redux imports
import { Provider } from "react-redux";
import store from "./store";
import { LOGOUT } from "./actions/constants";
import NotFound from "./components/layout/NotFound";

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
    
    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route>
              <section className="container">
                <Switch>
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/profiles" component={Profiles} />
                  <Route exact path="/profile/:id" component={Profile} />
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <PrivateRoute
                    exact
                    path="/create-profile"
                    component={CreateProfile}
                  />
                  <PrivateRoute
                    exact
                    path="/edit-profile"
                    component={EditProfile}
                  />
                  <PrivateRoute
                    exact
                    path="/add-experience"
                    component={AddExperience}
                  />
                  <PrivateRoute
                    exact
                    path="/add-education"
                    component={AddEducation}
                  />
                  <PrivateRoute exact path="/posts" component={Posts} />
                  <PrivateRoute exact path="/posts/:id" component={Post} />
                  <Route component={NotFound} />
                </Switch>
              </section>
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;