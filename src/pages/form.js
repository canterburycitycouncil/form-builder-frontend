import { Paper } from "@material-ui/core";
import { API, Auth, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useLocation, useParams, useHistory } from 'react-router-dom';
import Overlay from "../components/overlay";
import { getForm } from "../graphql/queries";
import FrontendLayout from '../components/frontend-layout'
import FormDisplay from '../components/form-display';


const Form = (props) => {
    const [formScheme, setFormScheme] = useState(null);
    const [formValues, setFormValues] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [anonymous, setAnonymous] = useState(false);

    const location = useLocation();
    const history = useHistory();

    let { id, page } = useParams();
    
    useEffect(async () => {
        if(!formScheme && id){
            if(sessionStorage.getItem('formScheme') && (sessionStorage.getItem('id') === id)){
                let formData = sessionStorage.getItem('formScheme');
                setFormScheme(JSON.parse(formData));
            }else{
                sessionStorage.removeItem('formValues');
                let formData = await API.graphql(graphqlOperation(getForm, {id: id}));
                if(formData.data){
                    formData.data.getForm.pages = JSON.parse(formData.data.getForm.pages);
                    formData.data.getForm.outputs = JSON.parse(formData.data.getForm.outputs);
                    sessionStorage.setItem('formScheme', JSON.stringify(formData.data.getForm));
                    sessionStorage.setItem('id', id);
                    setFormScheme(formData.data.getForm);
                }
            }
        }

        if(!props.user && !anonymous){
            if(sessionStorage.getItem('anonymous')){
                setAnonymous(true);
            }else if(isLoading){
                setIsLoading(false);
            }
        }

        if(formScheme && !page){
            page = formScheme.pages[0].path;
            history.push(location.pathname+page+location.search);
        }
    }, [formScheme])

    // const handleChange = (event) => {
    //     let label = event.target.name;
    //     let value = event.target.value;

    //     let fieldValuesCopy = {...formValues};
    //     fieldValuesCopy[label] = value;

    //     setFormValues(fieldValuesCopy);
    // }

    // const handleBack = (event) => {
    //     event.preventDefault();
    //     setCurrentPage(currentPage - 1);
    // }

    // const handleNext = (event) => {
    //     event.preventDefault();
    //     let result = true;
    //     let fields = formScheme.pages[currentPage].fields;
    //     fields.forEach(field => {
    //         if(field.required && !formValues[field.id]){
    //             handleError(`Field ${field.label} is required.`, field.id);
    //             result = false;
    //         }else if(field.validations && field.validations.length > 0){
    //             field.validations.forEach(validation => {
    //                 if(!validation.runValidation(field.value)){
    //                     handleError(validation.getErrorText(field.label), field.id);
    //                     result = false;
    //                 }
    //             });
    //         }
    //     });
    //     if(result){
    //         setCurrentPage(currentPage+1);
    //         setErrorText([]);
    //         setFieldErrors([]);
    //     }
    // }

    // const handleError = (text, field) => {
    //     let errorTextCopy = errorText.slice(0, errorText.length);
    //     let fieldErrorsCopy = fieldErrors.slice(0, fieldErrors.length);
    //     if(errorText.length === 0){
    //         errorTextCopy.push('There are one or more errors in your responses. Please fix these before continuing.');
    //     }
    //     errorTextCopy.push(text);
    //     fieldErrorsCopy.push(field);
    //     setErrorText(errorTextCopy);
    //     setFieldErrors(fieldErrorsCopy);
    // }

    const handleIsLoading = (loading) => {
        setIsLoading(loading);
    }

    const signIn = (e) => {
        e.preventDefault();
        Auth.federatedSignIn({
            customState: location.pathname
        });
    }

    const continueAsAnonymous = (e) => {
        e.preventDefault();
        sessionStorage.setItem('anonymous', true);
        setAnonymous(true);
    }

    return (
        <React.Fragment>
            {isLoading ? (
                <Overlay />
            ) : ''}
            <FrontendLayout title={formScheme ? formScheme.name : ''}>
            {!props.user && !anonymous ? (
                <div className="signInContainer">
                    <div className="halfWidth">
                        <div className="contentBox">
                            <h2>Sign in to your account</h2>
                            <p>Keep a record of your cases, and save your progress so you can return later.</p>
                            <button className="button button-secondary" onClick={e => signIn(e)}><span className="button-inner">Sign in</span></button>
                        </div>
                    </div>
                    <div className="halfWidth">
                        <div className="contentBox">
                            <h2>Continue without signing in</h2>
                            <p>You'll have the option to sign up for an account when you complete the form.</p>
                            <button className="button button-secondary" onClick={e => continueAsAnonymous(e)}><span className="button-inner">Continue as a guest</span></button>
                        </div>
                    </div>
                </div>
            ) : (
                <FormDisplay id={id} user={props.user} onIsLoading={handleIsLoading} formScheme={formScheme} isLoading={isLoading} />
            )}
            </FrontendLayout>
        </React.Fragment>
    )
}

export default Form;