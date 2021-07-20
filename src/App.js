import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import routes from './routes';

const App = () => {

    return (
        <React.Fragment>
            <Switch>
              {routes.map(route =>{
                if(route.exact){
                  return (
                    <Route path={route.path} exact key="route.path">
                      <route.component></route.component>
                    </Route>
                  );
                }else{
                  return (
                    <Route path={route.path} key="route.path">
                      <route.component></route.component>
                    </Route>
                  )
                }
              })}
            </Switch>
        </React.Fragment>
    );
}

export default App;