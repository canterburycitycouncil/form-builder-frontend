import { Auth, Hub } from 'aws-amplify';
import React, { useState } from 'react';
import Overlay from '../components/overlay';
import FrontendLayout from '../components/frontend-layout';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();

    // console.log(Auth);

    // Hub.listen('auth', ({payload: {event, data}}) => {
    //     console.log(event);
    //     switch(event){
    //       case 'customOAuthState':
    //         if(data.startsWith('/')){
    //           history.push(data);
    //           setIsLoading(false);
    //         }else{
    //             console.log(data);
    //         }
    //       break;
    //       default:
    //           console.log(data);
    //       break;
    //     }
    // });

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

export default Home;