import React from "react";
import './default.scss';
import { Switch, Route, Redirect} from 'react-router-dom';
import { useGlobalContext } from "./components/context/context";

// REDUX
import { useSelector } from 'react-redux';

//COMPONENTS
import AdminToolbar from './components/AdminToolbar/AdminToolbar'

//HOC
import WithAuth from './hoc/WithAuth'
import WithAdminAuth from "./hoc/WithAdminAuth";

//LAYOUTS
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import AdminLayout from "./layouts/AdminLayout";

//PAGES
import Homepage from "./pages/Homepage/Homepage";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import Recovery from "./pages/Recovery/Recovery";
import MiCuenta from "./pages/MiCuenta/MiCuenta";
import Admin from "./pages/Admin/Admin";
import Store from "./pages/Store/Store";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

function App() {

  const {isLogIn} = useGlobalContext();

  
  return (
    <div className="App">
      <AdminToolbar />
      <Switch>
        <Route exact path='/' render={() => (
          <HomepageLayout>
            <Homepage />
          </HomepageLayout>
        )} />

        <Route path='/registration' 
          render={() => isLogIn.currentUser ? <Redirect to='/'/> : (
            <MainLayout>
              <Registration />
            </MainLayout>
        )} />

        <Route path='/login' 
          render={() => isLogIn.currentUser ? <Redirect to='/' /> : (
            <MainLayout>
              <Login />
            </MainLayout>
          )} />

        <Route path='/recovery' 
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )} />

        <Route exact path='/tienda' render={() => (
            <MainLayout>
              <Store />
            </MainLayout>
          )} />

        <Route path='/tienda/:filterType' render={() => (
            <MainLayout>
              <Store />
            </MainLayout>
          )} />
          
          <Route path='/product/:productID' render={() => (
            <MainLayout>
              <ProductDetail />
            </MainLayout>
          )} />

        <Route path='/micuenta' 
          render={() => (
            <WithAuth>
              <MainLayout>
                <MiCuenta />
              </MainLayout>
            </WithAuth>
          )} />

        <Route path='/admin' 
          render={() => (
            <WithAdminAuth>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </WithAdminAuth>
          )} />
      </Switch>

    </div>
  );
}

export default App;
