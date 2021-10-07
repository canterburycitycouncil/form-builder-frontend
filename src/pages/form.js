import { Paper } from "@material-ui/core";
import { API, Auth, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import Overlay from "../components/overlay";
import { getForm } from "../graphql/queries";
import FrontendLayout from "../components/frontend-layout";
import FormDisplay from "../components/formDisplay";
// import externalAuthConfig from '../external-auth-config';

// Auth.configure(externalAuthConfig);

const Form = (props) => {
  const [formScheme, setFormScheme] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [anonymous, setAnonymous] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const location = useLocation();
  const history = useHistory();

  let { id, page, internal } = useParams();

  useEffect(async () => {
    if (!user && !anonymous) {
      if (sessionStorage.getItem("anonymous")) {
        setAnonymous(true);
      } else {
        Auth.currentAuthenticatedUser()
          .then(async (authenticatedUser) => {
            setUser(authenticatedUser);
            Auth.currentUserInfo()
              .then((data) => {
                setUserData(data);
                setIsLoading(false);
              })
              .catch((err) => {
                console.log("could not retrieve user");
                setIsLoading(false);
              });
          })
          .catch((err) => {
            console.log(err);
            console.log("no currently authenticated user");
            setIsLoading(false);
          });
      }
    }
    if (!formScheme && id) {
      if (
        sessionStorage.getItem("formScheme") &&
        sessionStorage.getItem("id") === id
      ) {
        let formData = sessionStorage.getItem("formScheme");
        setFormScheme(JSON.parse(formData));
      } else {
        sessionStorage.removeItem("formValues");
        let formData = await API.graphql(graphqlOperation(getForm, { id: id }));
        if (formData.data) {
          formData.data.getForm.pages = JSON.parse(formData.data.getForm.pages);
          formData.data.getForm.outputs = JSON.parse(
            formData.data.getForm.outputs
          );
          sessionStorage.setItem(
            "formScheme",
            JSON.stringify(formData.data.getForm)
          );
          sessionStorage.setItem("id", id);
          setFormScheme(formData.data.getForm);
        }
      }
    }

    if (formScheme && !page) {
      page = formScheme.pages[0].path;
      history.push(location.pathname + page + location.search);
    }
  }, [formScheme]);

  const handleIsLoading = (loading) => {
    setIsLoading(loading);
  };

  const signIn = (e) => {
    e.preventDefault();
    internal === "internal-account"
      ? Auth.federatedSignIn({
          provider: "Google",
          customState: location.pathname + location.search,
        })
      : Auth.federatedSignIn({
          customState: location.pathname + location.search,
        });
  };

  const continueAsAnonymous = (e) => {
    e.preventDefault();
    sessionStorage.setItem("anonymous", true);
    setAnonymous(true);
  };

  return (
    <React.Fragment>
      {isLoading ? <Overlay /> : ""}
      <FrontendLayout title={formScheme ? formScheme.name : ""}>
        {!user && !anonymous ? (
          <div className="signInContainer">
            <div className="halfWidth">
              <div className="contentBox">
                <h2>Sign in to your account</h2>
                <p>
                  Keep a record of your cases, and save your progress so you can
                  return later.
                </p>
                <button
                  className="button button-secondary"
                  onClick={(e) => signIn(e)}
                >
                  <span className="button-inner">
                    {internal === "internal-account"
                      ? "Google sign in"
                      : "Sign in"}
                  </span>
                </button>
              </div>
            </div>
            <div className="halfWidth">
              <div className="contentBox">
                <h2>Continue without signing in</h2>
                <p>
                  You'll have the option to sign up for an account when you
                  complete the form.
                </p>
                <button
                  className="button button-secondary"
                  onClick={(e) => continueAsAnonymous(e)}
                >
                  <span className="button-inner">Continue as a guest</span>
                </button>
              </div>
            </div>
          </div>
        ) : (user && userData) || anonymous ? (
          <FormDisplay
            id={id}
            user={user}
            userData={userData}
            onIsLoading={handleIsLoading}
            formScheme={formScheme}
            isLoading={isLoading}
          />
        ) : (
          ""
        )}
      </FrontendLayout>
    </React.Fragment>
  );
};

export default Form;
