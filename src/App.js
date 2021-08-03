import React from "react";
import { Switch, Route, Redirect} from 'react-router-dom';
import { useGlobalContext } from "./components/context/context";
//LAYOUTS
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

//PAGES
import Homepage from "./pages/Homepage/Homepage";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";

import './default.scss';

function App() {

  const {isLogIn} = useGlobalContext();
  
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' render={() => (
          <HomepageLayout>
            <Homepage />
          </HomepageLayout>
        )} />

        <Route exact path='/registration' render={() => (
          <MainLayout>
            <Registration />
          </MainLayout>
        )} />

        <Route exact path='/login' 
          render={() => isLogIn.currentUser ? <Redirect to='/' /> : (
            <MainLayout>
              <Login />
            </MainLayout>
          )} />
      </Switch>

    </div>
  );
}

export default App;
