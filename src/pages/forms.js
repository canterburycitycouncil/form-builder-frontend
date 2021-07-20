import { Grid, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Layout from '../components/layout';
import { useParams, useLocation, Link , useHistory} from 'react-router-dom';
import FormController from '../components/form-controller';
import { useEffect, useState } from "react";
import React from "react";

const Forms = () => {
    const [forms, setForms] = useState(null);
    let location = useLocation();
    let splitPath = location.pathname.split('/');
    let id;
    if(splitPath.length > 2 && splitPath[2] !== 'add'){
        id = splitPath[2];
    }
    let edit = false;
    const history = useHistory();
    if(!id && location.pathname === '/forms/add'){
        id = 0;
    }
    if(location.pathname.endsWith('/edit')){
        edit = true;
    }

    useEffect(() => {
        if(!forms && sessionStorage.getItem('forms')){
            setForms(JSON.parse(sessionStorage.getItem('forms')));
        }
    },[forms]);

    let formIds;

    if(forms){
        formIds = Object.keys(forms);
    }

    const saveForm = (form, id) => {
        let formsCopy = {...forms};
        if(id && formsCopy.id){
            formsCopy.id = form;
        }else{
            let formsCount = Object.keys(formsCopy).length;
            formsCopy[formsCount+1] = form;
            id = formsCount+1;
        }
        setForms(formsCopy);
        sessionStorage.setItem('forms', JSON.stringify(formsCopy));
        history.push(`/forms/${id}`);
    }

    return (
        <Layout title="forms">
            <Grid container>
                <Grid item xs={3}>
                    <List>
                        <Link to="/forms/add">
                            <ListItem button>
                                <ListItemIcon><AddIcon></AddIcon></ListItemIcon>
                                <ListItemText>Add form</ListItemText>
                            </ListItem>
                        </Link>
                    </List>
                    {formIds && formIds.length > 0 ? (
                    <React.Fragment>
                        <Typography variant="h4" color="primary">Forms</Typography>
                        <List>
                            {formIds.map(formId => (
                                <Link to={`/forms/${formId}`}>
                                    <ListItem button>
                                        <ListItemText>{forms[formId].name}</ListItemText>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </React.Fragment>
                    ) : ''}
                </Grid>
                <Divider orientation="vertical" flexItem style={{marginLeft: '-1px'}} />
                <Grid item xs={9} className="formContainer">
                    {id || id === 0 ? (
                        <FormController id={id} edit={id === 0 ? true : edit} forms={forms} onFormSave={saveForm} />
                    ): (
                        <p>No form selected</p>
                    )}
                </Grid>
            </Grid>
        </Layout>
    )
}

export default Forms;