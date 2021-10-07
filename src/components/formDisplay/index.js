import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useLocation, Link, useParams, useHistory } from "react-router-dom";
import { createSubmission, updateForm } from "../../graphql/mutations";
import freshdeskIntegration from "../../outputs/freshdesk";
import { ComponentRender } from "./componentRender";

const personalDetailsFields = [
  {
    name: "first_name",
    attribute: "custom:first_name",
  },
  {
    name: "surname",
    attribute: "custom:surname",
  },
  {
    name: "email",
    attribute: "email",
  },
  {
    name: "telephone",
    attribute: "custom:telephone",
  },
];

const FormDisplay = ({ id, user, userData, onIsLoading, formScheme }) => {
  const [formValues, setFormValues] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [fieldErrors, setFieldErrors] = useState([]);
  const [errorText, setErrorText] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);

  const location = useLocation();
  const history = useHistory();
  let splitPath = location.pathname.split("/");
  splitPath.pop();
  let formBaseUrl = splitPath.join("/");
  const { page } = useParams();

  useEffect(() => {
    const getFieldData = async () => {
      if (formScheme && !formValues) {
        let formValuesDefault = {};
        let pages = formScheme.pages;
        let params = getParamsFromSearch(location.search);
        let fields = pages.reduce((acc, page) => {
          if (page.components) {
            page.components.forEach((field) => {
              acc.push(field);
            });
          }
          return acc;
        }, []);
        if (user && userData) {
          console.log("hello");
          personalDetailsFields.forEach((detail) => {
            formValuesDefault[detail.name] =
              userData.attributes[detail.attribute];
          });
        }
        fields.forEach((field) => {
          if (!formValuesDefault[field.name]) {
            if (field.defaultValue) {
              formValuesDefault[field.name] = field.defaultValue;
            } else if (
              field.options.parameterName &&
              params &&
              params[field.options.parameterName]
            ) {
              formValuesDefault[field.name] =
                params[field.options.parameterName];
            } else {
              switch (field.type) {
                case "select":
                  let selectValues = field.values;
                  if (selectValues && selectValues.length > 0) {
                    formValuesDefault[field.name] = selectValues[0].key;
                  } else {
                    formValuesDefault[field.name] = "";
                  }
                  break;
                default:
                  formValuesDefault[field.name] = "";
              }
            }
          }
        });
        setFormValues(
          JSON.parse(sessionStorage.getItem("formValue"))
            ? JSON.parse(sessionStorage.getItem("formValue"))
            : formValuesDefault
        );
        onIsLoading(false);
      }
      if (!startDate && sessionStorage.getItem("startDate")) {
        setStartDate(sessionStorage.getItem("startDate"));
      } else if (!startDate && !sessionStorage.getItem("startDate")) {
        let newStartDate = getFormattedDate(new Date());
        sessionStorage.setItem("startDate", newStartDate);
        setStartDate(newStartDate);
      }
    };

    getFieldData();
  }, [formScheme]);

  const getParamsFromSearch = (searchString) => {
    if (searchString) {
      searchString = searchString.replace("?", "");
      let searchStringPairs = searchString.split("&");
      let resObj = {};
      searchStringPairs.forEach((pair) => {
        let pairSplit = pair.split("=");
        resObj[pairSplit[0]] = pairSplit[1];
      });
      return resObj;
    }
    return null;
  };

  const handleChange = (event) => {
    let label = event.target.name;
    let value = event.target.value;

    let fieldValuesCopy = { ...formValues };
    fieldValuesCopy[label] = value;

    setFormValues(fieldValuesCopy);
    sessionStorage.setItem("formValue", JSON.stringify(fieldValuesCopy));
  };

  const handleBack = (event) => {
    event.preventDefault();
    console.log(currentPage);
    history.push(
      formBaseUrl + formScheme.pages[currentPage - 1].path + location.search
    );
    setCurrentPage(currentPage - 1);
  };

  const handleNext = (event) => {
    event.preventDefault();
    let result = true;
    let fields = formScheme.pages[currentPage].components;
    let errors = [];
    let errorFields = [];
    fields.forEach((field) => {
      if (
        field.options.required ||
        (field.options.required === undefined && !formValues[field.name])
      ) {
        result = false;
        errors.push(`Field ${field.title} is required`);
        errorFields.push(field.name);
      } else if (field.validations && field.validations.length > 0) {
        field.validations.forEach((validation) => {
          if (!validation.runValidation(field.value)) {
            errors.push(validation.getErrorText(field.title));
            errorFields.push(field.name);
            result = false;
          }
        });
      }
    });
    if (result) {
      history.push(
        formBaseUrl +
          formScheme.pages[currentPage].next[0].path +
          location.search
      );
      setCurrentPage(currentPage + 1);
      setErrorText([]);
      setFieldErrors([]);
    } else {
      handleError(errors, errorFields);
    }
  };

  const handleError = (text, field) => {
    let errorTextCopy = errorText.slice(0, errorText.length);
    let fieldErrorsCopy = fieldErrors.slice(0, fieldErrors.length);
    field.forEach((fieldName, index) => {
      if (fieldErrors.indexOf(fieldName) === -1) {
        if (errorTextCopy.length === 0) {
          errorTextCopy.push(
            "There are one or more errors in your responses. Please fix these before continuing."
          );
        }
        errorTextCopy.push(text[index]);
        fieldErrorsCopy.push(fieldName);
        setErrorText(errorTextCopy);
        setFieldErrors(fieldErrorsCopy);
      }
    });
  };

  const getFormattedDate = (date) => {
    let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    let month =
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1);
    let year = date.getFullYear();
    return `${day}/${month}/${year} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  const handleSubmit = async (event) => {
    onIsLoading(true);
    event.preventDefault();
    let formCopy = { ...formScheme };
    formCopy.pages = JSON.stringify(formCopy.pages);
    let submitDate = new Date();
    let subDateFormatted = getFormattedDate(submitDate);
    if (formScheme && formValues) {
      if (location.pathname.indexOf("admin") > -1) {
        setSubmissionId("X");
        setFormSubmitted(true);
        onIsLoading(false);
      } else {
        let subID = formScheme.totalSubs + 1;
        console.log(formScheme.totalSubs);
        console.log(subID);
        let submission = {
          subID: subID,
          formID: formScheme.id,
          status: "submitted",
          values: JSON.stringify(formValues),
          startDate: startDate,
          submissionDate: subDateFormatted,
        };
        let formUpdated = await API.graphql(
          graphqlOperation(updateForm, {
            input: { id: formScheme.id, totalSubs: subID },
          })
        );
        let submissionCreated = await API.graphql(
          graphqlOperation(createSubmission, { input: submission })
        );
        if (submissionCreated && submissionCreated.data) {
          setSubmissionId(submissionCreated.data.createSubmission.subID);
          setFormSubmitted(true);
          onIsLoading(false);
        }
        if (formScheme.outputs && formScheme.outputs.length > 0) {
          formScheme.outputs.forEach(async (output) => {
            switch (output.type) {
              case "freshdesk":
                try {
                  const ticketRes = await freshdeskIntegration(
                    formValues,
                    output.outputConfiguration.customFields,
                    formScheme.id
                  );
                  console.log(ticketRes);
                } catch (err) {
                  console.log(err);
                }
                break;
              default:
                console.log("integration not found");
            }
          });
        }
      }
    }
  };
  //   console.log(formScheme);

  return (
    <React.Fragment>
      {formScheme && formValues && !formSubmitted ? (
        <div className="contentBox contentBoxOffset">
          {errorText && errorText.length > 0 ? (
            <div className="information-box error">
              <p>{errorText[0]}</p>
              {errorText.length > 1 ? (
                <ul className="errorFieldList">
                  {errorText.slice(1, errorText.length).map((line, index) => (
                    <li key={`error-${index}`}>{line}</li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
          {currentPage || currentPage === 0 ? (
            <h2>{formScheme.pages[currentPage].title}</h2>
          ) : (
            ""
          )}
          <form onSubmit={(e) => handleSubmit(e)}>
            {(currentPage || currentPage === 0) && page !== "summary" ? (
              <React.Fragment>
                {formScheme.pages[currentPage].components.map((field, idx) => {
                  return (
                    <ComponentRender
                      key={idx}
                      fieldType={field}
                      formValues={formValues}
                      onChange={(e) => handleChange(e)}
                    />
                  );
                })}
                <div className="formActionsContainer">
                  {currentPage > 0 ? (
                    <button
                      className="button formBackButton"
                      type="button"
                      onClick={(e) => handleBack(e)}
                    >
                      Back
                    </button>
                  ) : (
                    ""
                  )}
                  {formScheme.pages[currentPage].next ? (
                    <button
                      className="button formNextButton"
                      type="button"
                      onClick={(e) => handleNext(e)}
                    >
                      Next
                    </button>
                  ) : currentPage === formScheme.pages.length - 1 ? (
                    <button className="button formSubmitButton" type="submit">
                      Submit
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </React.Fragment>
            ) : page === "summary" ? (
              <React.Fragment>
                <p>
                  Pressing "Submit" will send the details confirmed below for
                  processing.
                </p>
                <ul className="list listFormSummary">
                  {Object.keys(formValues).map((fieldName) => {
                    return (
                      <li key={`field_value_${fieldName}`} className="listItem">
                        <span className="listItemTitle">{fieldName}</span>
                        <div className="listItemContent">
                          {formValues[fieldName]}
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="formActionsContainer">
                  <button
                    className="button formBackButton"
                    type="button"
                    onClick={(e) => handleBack(e)}
                  >
                    Back
                  </button>
                  <button className="button formSubmitButton" type="submit">
                    Submit
                  </button>
                </div>
              </React.Fragment>
            ) : (
              <p>There was an error fetching this page of the form</p>
            )}
          </form>
        </div>
      ) : formSubmitted ? (
        <div className="contentBox contentBoxOffset">
          <h2>Form submission complete</h2>
          <p>
            Your form was successsfully submitted. The form reference for this
            submission is {submissionId}.
          </p>
          <a className="button" href="https://www.canterbury.gov.uk/">
            Continue
          </a>
        </div>
      ) : (
        <div className="contentBox">Form could not be found</div>
      )}
    </React.Fragment>
  );
};

export default FormDisplay;
