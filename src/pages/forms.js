import { Grid, Divider, List, ListItem, ListItemText, Typography, Tabs, Tab, Box } from "@material-ui/core";
import Layout from '../components/layout';
import { useLocation, Link , useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import React from "react";
import { API, graphqlOperation, Auth} from "aws-amplify";
import { listForms } from '../graphql/queries';
import { onCreateForm, onUpdateForm, onDeleteForm } from '../graphql/subscriptions';
import FormDisplay from '../components/formDisplay';
import FormSubmissions from '../components/form-submissions';
import Overlay from "../components/overlay";
// import internalAuthConfig from "../internal-auth-config";

// Auth.configure(internalAuthConfig);

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

const Forms = (props) => {
    const [forms, setForms] = useState(null);
    const [subscriptions, setSubscriptions] = useState(null);
    const [currentTab, setCurrentTab] = useState('preview');
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    let location = useLocation();
    const { id } = useParams();
    let isNewForm = false;
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
                    sessionStorage.removeItem('formValues');
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

        // if(!user){
        //     Auth.currentAuthenticatedUser().then(async (authenticatedUser) => {
        //         setUser(authenticatedUser)
        //         Auth.currentUserInfo().then(data => {
        //           setUserData(data);
        //           setIsLoading(false);
        //         }).catch(err => {
        //           console.log('could not retrieve user');
        //           setIsLoading(false);
        //           Auth.federatedSignIn();
        //         });
        //     }).catch(err => {
        //         console.log(err);
        //         console.log('no currently authenticated user');
        //         setIsLoading(false);
        //         Auth.federatedSignIn();
        //     });   
        // }

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
                setIsLoading(false);
                resolve();
            }catch(err) {
                console.log(err);
                console.log('error fetching forms');
                setIsLoading(false);
                reject();
            }
        });
        return promise;
    }

    const changeTab = (event, newValue) => {
        setCurrentTab(newValue);
    }

    const handleIsLoading = (loading) => {
        setIsLoading(loading);
    }

    return (
        <React.Fragment>
            {isLoading ? (
                <Overlay />
            ) : (
                <Layout title="forms">
                    <Grid container>
                        <Grid item xs={3}>
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
                            {(id && forms) ? (
                                <React.Fragment>
                                    <Tabs value={currentTab} onChange={changeTab}>
                                            <Tab label="Preview" value="preview" />
                                            <Tab label="Submissions" value="submissions" />
                                    </Tabs>
                                    <TabPanel value={currentTab} index="preview">
                                        <FormDisplay id={id} user={props.user} onIsLoading={e => handleIsLoading}  />
                                    </TabPanel>
                                    <TabPanel value={currentTab} index="submissions">
                                        <FormSubmissions form={forms.find(form => form.id === id)} />
                                    </TabPanel>
                                </React.Fragment>
                            ) : (
                                <p>No form selected</p>
                            )}
                        </Grid>
                    </Grid>
                </Layout>
            )}
        </React.Fragment>
    )
}

export default Forms;