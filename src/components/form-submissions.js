import { makeStyles, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { listSubmissions } from "../graphql/queries";

const useStyles = makeStyles({
    root: {
        color: '#fff'
    }
})


const FormSubmissions = ({ form }) => {

    const [submissionList, setSubmissionList] = useState(null);
    const classes = useStyles();

    useEffect( async () => {
        if(!submissionList){
            try{
                let submissions = await API.graphql(graphqlOperation(listSubmissions, {formID: form.id}));
                if(submissions && submissions.data){
                    setSubmissionList(submissions.data.listSubmissions.items);
                }
            }catch(err){
                console.log(err);
            }
        }
    }, [submissionList])

    return(
        <>
        {submissionList && submissionList.length > 0 ? (
            <TableContainer component={Paper} className="pageCard">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.root}>ID</TableCell>
                            <TableCell className={classes.root} align="right">Form</TableCell>
                            <TableCell className={classes.root} align="right">Status</TableCell>
                            <TableCell className={classes.root} align="right">Start Date</TableCell>
                            <TableCell className={classes.root} align="right">Submission Date</TableCell>
                        </TableRow>
                    </TableHead>
                    {submissionList.map(submission => (
                        <TableRow>
                            <TableCell><Link to={`/admin/submissions/${submission.subID}`}>{submission.subID}</Link></TableCell>
                            <TableCell align="right">{form.name}</TableCell>
                            <TableCell align="right">{submission.status}</TableCell>
                            <TableCell align="right">{submission.startDate}</TableCell>
                            <TableCell align="right">{submission.submissionDate}</TableCell>
                        </TableRow>
                    ))}
                </Table>
            </TableContainer>
        ) : (
            <Paper>
                <p>There are no submissions for this form yet.</p>
            </Paper>
        )}
        </>
    )

}

export default FormSubmissions;