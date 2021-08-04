import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { listSubmissions } from "../graphql/queries";
import { useParams } from 'react-router-dom';
import { Grid, Paper, Typography } from "@material-ui/core";

const Submission = () => {

    const [submission, setSubmission] = useState(null);
    let { id } = useParams();

    useEffect(async () => {
        if(!submission){
            try{
                let submissionData = await API.graphql(graphqlOperation(listSubmissions, {subID: id}));
                if(submissionData && submissionData.data){
                    console.log(submissionData);
                    submissionData.data.listSubmissions.items[0].values = JSON.parse(submissionData.data.listSubmissions.items[0].values);
                    setSubmission(submissionData.data.listSubmissions.items[0]);
                }
            }catch(err){
                console.log(err);
            }
        }
    }, [submission])

    return (
        <Grid container>
            <Paper>
            {submission ? (
                <React.Fragment>
                    <Typography variant="h2">Form responses</Typography>
                    {Object.keys(submission.values).map( (id, index) => (
                        <div key={index} className="subResponseContainer">
                            <span className="subResName">{id}</span>
                            <span className="subResValue">{submission.values[id]}</span>
                        </div>
                    ))}
                </React.Fragment> 
            ) : (
                <p>No submission data found.</p>
                )}
            </Paper>
        </Grid>
    )

}

export default Submission;