import { Grid, Divider, List, ListItem, ListItemIcon, ListItemText, Typography, Tabs, Tab, Box } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Layout from '../components/layout';
import { useLocation, Link , useHistory} from 'react-router-dom';
import FormController from '../components/form-controller';
import { useEffect, useState } from "react";
import React from "react";
import Amplify, { API, graphqlOperation} from "aws-amplify";
import awsExports from "../aws-exports";
import { listForms } from '../graphql/queries';
import { createForm, updateForm, deleteForm } from '../graphql/mutations';
import { onCreateForm, onUpdateForm, onDeleteForm } from '../graphql/subscriptions';
import FormDisplay from '../components/form-display';
import FormSubmissions from '../components/form-submissions';
import FormRules from '../components/form-rules';

Amplify.configure(awsExports);

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </div>
    );
  }

const Forms = () => {
    const [forms, setForms] = useState(null);
    const [subscriptions, setSubscriptions] = useState(null);
    const [currentTab, setCurrentTab] = useState('preview');
    let location = useLocation();
    let splitPath = location.pathname.split('/');
    let id;
    let isNewForm = false;
    if(splitPath.length > 3 && splitPath[3] !== 'add'){
        id = splitPath[3];
    }
    const history = useHistory();
    if(!id && location.pathname === '/admin/forms/add'){
        isNewForm = true;
    }

    useEffect(() => {
        const getDBSubscriptions = async () => {
            const createSub = await API.graphql(graphqlOperation(onCreateForm)).subscribe({
                next: ({provider, value}) => {
                    let createdForm = value.data.onCreateForm;
                    let formsCopy;
                    if(forms){
                        formsCopy = forms.slice(0, forms.length);
                    }else{
                        formsCopy = [];
                    }
                    if(formsCopy && formsCopy.findIndex(form => form.id === createdForm.id) === -1){
                        formsCopy.push(createdForm);
                        setForms(formsCopy);
                    }else if(!formsCopy){
                        formsCopy = [createdForm];
                        setForms(formsCopy);
                    }
                },
                error: err => console.warn(err)
            });
            const updateSub = await API.graphql(graphqlOperation(onUpdateForm)).subscribe({
                next: ({provider, value}) => {
                    let updatedForm = value.data.onUpdateForm;
                    if(forms){
                        let formsCopy = forms.slice(0, forms.length);
                        let formIndex = formsCopy.findIndex(form => form.id === updatedForm.id);
                        formsCopy.splice(formIndex, 1, updatedForm);
                        setForms(formsCopy);
                    }
                },
                error: err => console.warn(err)
            });
            const deleteSub = await API.graphql(graphqlOperation(onDeleteForm)).subscribe({
                next: ({provider, value}) => {
                    let deletedForm = value.data.onDeleteForm;
                    if(forms){
                        let formsCopy = forms.slice(0, forms.length);
                        if(formsCopy && formsCopy.length > 0){
                            let formIndex = formsCopy.findIndex(form => form.id === deletedForm.id)
                            if(formIndex > -1){
                                formsCopy.splice(formIndex, 1);
                                setForms(formsCopy);
                            }
                        }
                    }
                },
                error: err => console.warn(err)
            });
            setSubscriptions([createSub, updateSub, deleteSub]);
        }

        if(!subscriptions){
            fetchForms().then(res => {
                getDBSubscriptions();
            }).catch(err => {
                getDBSubscriptions();
            });
        }

        return function cleanup(){
            if(subscriptions){
                subscriptions.forEach(sub => {
                    sub.unsubscribe();
                });
            }
        }
    }, [subscriptions]);

    const fetchForms = async () => {
        var promise = new Promise(async (resolve, reject) => {
            try{
                const formData = await API.graphql(graphqlOperation(listForms));
                const forms = formData.data.listForms.items;
                setForms(forms);
                resolve();
            }catch(err) {
                console.log(err);
                console.log('error fetching forms');
                reject();
            }
        });
        return promise;
    }

    const saveForm = async (form, id) => {
        form.pages = JSON.stringify(form.pages);
        subscriptions.forEach(sub => {
            sub.unsubscribe();
        })
        if(id){
            delete form.createdAt;
            delete form.updatedAt;
            let formsCopy = forms.slice(0, forms.length - 1);
            let formIndex = forms.findIndex(form => form.id === id);
            formsCopy.splice(formIndex, 1, form);
            setForms(formsCopy);
            await API.graphql(graphqlOperation(updateForm, {input: {...form}}));
            history.push('/admin/forms/'+id);
        }else{
            API.graphql(graphqlOperation(createForm, {input: form})).then(res => {
                let response = res.data;
                if(response && response.createForm){
                    id = response.createForm.id;
                    history.push(`/admin/forms/${id}`);
                }else{
                    console.log('there was an error with creating the form');
                    history.push(`/admin/forms`);
                }
            });
        }
    }

    const handleDeleteForm = async (id) => {
        await API.graphql(graphqlOperation(deleteForm, {input: {id: id}}));
        history.push('/admin/forms');
    }

    const changeTab = (event, newValue) => {
        console.log('hello');
        setCurrentTab(newValue);
    }

    return (
        <Layout title="forms">
            <Grid container>
                <Grid item xs={3}>
                    <List>
                        <Link to={location => {
                            if(sessionStorage.getItem('currentForm')){
                                sessionStorage.removeItem('currentForm');
                            }
                            return '/admin/forms/add'
                        }}>
                            <ListItem button>
                                <ListItemIcon><AddIcon></AddIcon></ListItemIcon>
                                <ListItemText>Add form</ListItemText>
                            </ListItem>
                        </Link>
                    </List>
                    {forms && forms.length > 0 ? (
                    <React.Fragment>
                        <Typography variant="h4" color="primary">Forms</Typography>
                        <List>
                            {forms.map(form => (
                                <Link to={`/admin/forms/${form.id}`} key={'form-'+form.id}>
                                    <ListItem button>
                                        <ListItemText>{form.name}</ListItemText>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </React.Fragment>
                    ) : ''}
                </Grid>
                <Divider orientation="vertical" flexItem style={{marginLeft: '-1px'}} />
                <Grid item xs={9} className="formContainer">
                    {((id || id === 0) && forms) ? (
                        <React.Fragment>
                            <Tabs value={currentTab} onChange={changeTab}>
                                    <Tab label="Preview" value="preview" />
                                    <Tab label="Edit" value="edit" />
                                    <Tab label="Submissions" value="submissions" />
                                    <Tab label="Rules" values="rules" />
                            </Tabs>
                            <TabPanel value={currentTab} index="preview">
                                <FormDisplay id={id} />
                            </TabPanel>
                            <TabPanel value={currentTab} index="edit">
                                <FormController id={id} isNewForm={false} edit={true} forms={forms} onFormSave={saveForm} onFormDelete={handleDeleteForm} />
                            </TabPanel>
                            <TabPanel value={currentTab} index="submissions">
                                <FormSubmissions form={forms.find(form => form.id === id)} />
                            </TabPanel>
                            <TabPanel value={currentTab} index="rules">
                                <FormRules form={forms.find(form => form.id === id)} />
                            </TabPanel>
                        </React.Fragment>
                    ) : (isNewForm ? (
                        <FormController id={id} isNewForm={true} edit={true} forms={forms} onFormSave={saveForm} onFormDelete={handleDeleteForm} />
                    ) : (
                        <p>No form selected</p>
                    ))}
                </Grid>
            </Grid>
        </Layout>
    )
}

export default Forms;