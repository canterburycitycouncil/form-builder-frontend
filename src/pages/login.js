import React, { useState } from "react";
import FrontendLayout from "../components/frontend-layout";
import Overlay from "../components/overlay";
import { Hub, Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();

    Hub.listen('auth', ({payload: {event, data}}) => {
        console.log(event);
        console.log(Auth);
        switch(event){
          case 'customOAuthState':
            if(data.startsWith('/')){
              history.push(data);
              setIsLoading(false);
            }
          break;
          default:
              console.log(data);
          break;
        }
    });

    return (
        <React.Fragment>
            {isLoading ? (
                <Overlay />
            ) : ''}
            <FrontendLayout title="">
                <div></div>
            </FrontendLayout>
        </React.Fragment>
    )
}

export default Login;