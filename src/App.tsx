import React from 'react';
import './App.css';
import {Router,Route, RouteComponentProps, Switch,Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {routes} from './routes/listRoutes';
import {PrivateRoute} from './routes/PrivateRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTheme,ThemeProvider } from '@material-ui/core/styles'
import PageNotFound from './pages/NotFound';
const theme = createTheme({
  typography: {
    fontFamily: [
      'Public Sans',
      'cursive',
    ].join(','),
  },
  palette:{
    primary:{
      main: '#00AB55',
    },
  }
})
const history = createBrowserHistory();
function App() {

  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <Router history={history}>
      <ToastContainer/>
      <Switch>
                    {routes.map((route, index) => 
                    <Route
                        key={index}
                        path={route.path} 
                        exact={route.exact} 
                        render={(routeProps: RouteComponentProps<any>) => {
                            if (route.protected)
                                return <PrivateRoute><route.component  {...routeProps} /></PrivateRoute>;

                            return <route.component  {...routeProps} />;
                        }}
                    />)}
                    <Route exact path = "/">
                      <Redirect to="/Dashboard/Shop/all"></Redirect>
                    </Route>
                    <Route component={PageNotFound}/>
      </Switch>
      </Router>
    </div>
    </ThemeProvider>
  );
}

export default App;
