import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import routes from './routes';
import Amplify, { Auth, Hub, API} from "aws-amplify";

const App = () => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null)
    const history = useHistory();
    useEffect(async () => {
      if(!user){
        Auth.currentAuthenticatedUser().then(async (authenticatedUser) => {
          setUser(authenticatedUser)
          Auth.currentUserInfo().then(data => {
            console.log(data)
            setUserData(data);
          }).catch(err => {
            console.log('could not retrieve user');
          });
        }).catch(err => {
          console.log(err);
          console.log('no currently authenticated user');
        });
      }
    }, [user]);

    Hub.listen('auth', ({payload: {event, data}}) => {
      console.log(event);
      switch(event){
        case 'signIn':
          setUser(data);
        break;
        case 'signOut':
          setUser(null);
        break;
        case 'customOAuthState':
          if(data.startsWith('/')){
            history.push(data);
          }
        break;
        default:
        break;
      }
    })
    return (
        <React.Fragment>
            <Switch>
              {routes.map(route =>{
                if(route.exact){
                  return (
                    <Route path={route.path} exact key={route.path}>
                      <route.component user={user}></route.component>
                    </Route>
                  );
                }else{
                  return (
                    <Route path={route.path} key={route.path}>
                      <route.component user={user}></route.component>
                    </Route>
                  )
                }
              })}
            </Switch>
        </React.Fragment>
    );
}

export default App;