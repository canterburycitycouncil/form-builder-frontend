import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Overlay from "../components/overlay";
import { getForm } from "../graphql/queries";

const FormDisplay = ({ id }) => {
    const [formScheme, setFormScheme] = useState(null);
    const [formValues, setFormValues] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [fieldErrors, setFieldErrors] = useState([]);
    const [errorText, setErrorText] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [anonymous, setAnonymous] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submissionId, setSubmissionId] = useState(null);

    let location = useLocation();
    
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
                        sessionStorage.setItem('formScheme', JSON.stringify(formData.data.getForm));
                        sessionStorage.setItem('id', id);
                        setFormScheme(formData.data.getForm);
                    }
                }
        }else if(formScheme && !formValues){
            let formValuesDefault = {};
            let pages = formScheme.pages;
            let fields = pages.reduce((acc, page) => {
                if(page.fields){
                    page.fields.forEach(field => {
                        acc.push(field);
                    })
                }
                return acc
            }, []);
            fields.forEach(field => {
                if(field.defaultValue){
                    formValuesDefault[field.id] = field.defaultValue;
                }else{
                    switch(field.type){
                        case 'select':
                            let selectValues = field.values;
                            if(selectValues && selectValues.length > 0){
                                formValuesDefault[field.id] = selectValues[0].key;
                            }else{
                                formValuesDefault[field.id] = '';
                            }
                        break;
                        default:
                            formValuesDefault[field.id] = '';
                    }
                }
            });
            setFormValues(formValuesDefault);
            setIsLoading(false);
        }
        if(!startDate && sessionStorage.getItem('startDate')){
            setStartDate(sessionStorage.getItem('startDate'));
        }else if(!startDate && !sessionStorage.getItem('startDate')){
            let newStartDate = getFormattedDate(new Date());
            sessionStorage.setItem('startDate', newStartDate);
            setStartDate(newStartDate);
        }
    }, [formScheme])

    const handleChange = (event) => {
        let label = event.target.name;
        let value = event.target.value;

        let fieldValuesCopy = {...formValues};
        fieldValuesCopy[label] = value;

        setFormValues(fieldValuesCopy);
    }

    const handleBack = (event) => {
        event.preventDefault();
        setCurrentPage(currentPage - 1);
    }

    const handleNext = (event) => {
        event.preventDefault();
        let result = true;
        let fields = formScheme.pages[currentPage].fields;
        fields.forEach(field => {
            if(field.required && !formValues[field.id]){
                handleError(`Field ${field.label} is required.`, field.id);
                result = false;
            }else if(field.validations && field.validations.length > 0){
                field.validations.forEach(validation => {
                    if(!validation.runValidation(field.value)){
                        handleError(validation.getErrorText(field.label), field.id);
                        result = false;
                    }
                });
            }
        });
        if(result){
            setCurrentPage(currentPage+1);
            setErrorText([]);
            setFieldErrors([]);
        }
    }

    const handleError = (text, field) => {
        let errorTextCopy = errorText.slice(0, errorText.length);
        let fieldErrorsCopy = fieldErrors.slice(0, fieldErrors.length);
        if(errorText.length === 0){
            errorTextCopy.push('There are one or more errors in your responses. Please fix these before continuing.');
        }
        errorTextCopy.push(text);
        fieldErrorsCopy.push(field);
        setErrorText(errorTextCopy);
        setFieldErrors(fieldErrorsCopy);
    }

    const getFormattedDate = (date) => {
        let day = (date.getDate() > 9 ? date.getDate() : '0'+date.getDate());
        let month = (date.getMonth()+1 > 9 ? date.getMonth()+1 : '0'+(date.getMonth()+1));
        let year = date.getFullYear();
        return `${day}/${month}/${year} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }

    const handleSubmit = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        let formCopy = {...formScheme};
        formCopy.pages = JSON.stringify(formCopy.pages);
        let submitDate = new Date();
        if(formScheme && formValues){
                setSubmissionId('X');
                setFormSubmitted(true);
                setIsLoading(false);
        }
    }

    return (
        <React.Fragment>
            {isLoading ? (
                <Overlay />
            ) : ''}
            {formScheme && formValues && !formSubmitted ? (
                <div className="contentBox contentBoxOffset">
                    {errorText && errorText.length > 0 ? (
                        <div className="information-box error">
                            <p>{errorText[0]}</p>
                            {errorText.length > 1 ? (
                                <ul className="errorFieldList">
                                    {errorText.slice(1,errorText.length).map((line, index) => (
                                        <li key={`error-${index}`}>{line}</li>
                                    ))}
                                </ul>
                            ) : ''}
                        </div>
                    ): ''}
                    <form onSubmit={e => handleSubmit(e)}>
                        {currentPage || currentPage === 0 ? (
                            <React.Fragment>
                                {formScheme.pages[currentPage].fields.map(field => {
                                    let fieldRender;
                                    switch(field.type){
                                        case 'textfield':
                                            fieldRender = (
                                                    <input className="frontendTextfield" name={field.id} value={formValues[field.id]} onChange={e => handleChange(e)} />
                                            );
                                        break;
                                        case 'textarea':
                                            fieldRender = (
                                                    <textarea className="frontendTextarea" name={field.id} value={formValues[field.id]} onChange={e => handleChange(e)} />
                                            )
                                        break;
                                        case 'select':
                                            fieldRender = (
                                                    <select className="frontendSelect" name={field.id} value={formValues[field.id]} onChange={e => handleChange(e)}>
                                                            <option value="">--Please choose and option--</option>
                                                        {field.values.map(value => (
                                                            <option value={value.key}>{value.value}</option>
                                                        ))}
                                                    </select>
                                            );
                                        break;
                                    }
                                    return (                                            
                                        <div key={field.id} className={`formControl${fieldErrors.includes(field.id) ? ' fieldError' : ''}`}>
                                            <label htmlFor={field.id} className="frontendLabel">{field.label}{field.required ? (<span className="fieldRequired"> * </span>) : ''}</label>
                                            {fieldRender}
                                        </div>);
                                })}
                                <div className="formActionsContainer">
                                    {currentPage > 0 ? (
                                        <button className="button formBackButton" type="button" onClick={e => handleBack(e)}>Back</button>
                                    ) : ''}
                                    {currentPage < formScheme.pages.length - 1 ? (
                                        <button className="button formNextButton" type="button" onClick={e => handleNext(e)}>Next</button>
                                    ): currentPage === formScheme.pages.length - 1 ? (
                                        <button className="button formSubmitButton" type="submit">Submit</button>
                                    ): ''}
                                </div>
                            </React.Fragment>
                        ) : (<p>There was an error fetching this page of the form</p>)}
                    </form>
                </div>
            ) : (formSubmitted ? (
                <div className="contentBox contentBoxOffset">
                    <h2>Form submission complete</h2>
                    <p>Your form was successsfully submitted. The form reference for this submission is {submissionId}.</p>
                    <a className="button" href="https://www.canterbury.gov.uk/">Continue</a>
                </div>
            ) : (
                <div className="contentBox">Form could not be found</div>
                ))}
        </React.Fragment>
    )
}

export default FormDisplay;