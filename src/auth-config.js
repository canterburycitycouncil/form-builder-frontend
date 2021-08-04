import Amplify, { Auth } from 'aws-amplify';

const authExport = {

        // REQUIRED - Amazon Cognito Region
        region: 'eu-west-2',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'eu-west-2_k4RN8o34s',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '6njc8bd9a2nhee7pk9ql6vaj96',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: false,

        // OPTIONAL - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        cookieStorage: {
        // REQUIRED - Cookie domain (only required if cookieStorage is provided)
            domain: 'localhost',
        // OPTIONAL - Cookie path
            path: '/',
        // OPTIONAL - Cookie expiration in days
            expires: 365,
        // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
            sameSite: "lax",
        // OPTIONAL - Cookie secure flag
        // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
            secure: false
        },

         // OPTIONAL - Hosted UI configuration
        oauth: {
            domain: 'canterbury-cc.auth.eu-west-2.amazoncognito.com',
            scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
            redirectSignIn: 'https://main.d1ubra0eapsvnf.amplifyapp.com/',
            redirectSignOut: 'https://main.d1ubra0eapsvnf.amplifyapp.com/',
            responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        }
    }

export default authExport;