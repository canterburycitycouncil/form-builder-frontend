import React, { useEffect, useState } from "react";
import { Typography, TextField, Paper, List, ListItem, ListItemIcon, ListItemText, Grid, Modal, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import FieldController from './field-controller';
import FieldDisplay from './field-display';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import '../scss/global.scss';
import Add from "@material-ui/icons/Add";
import { useHistory } from 'react-router-dom';
import { Dialog } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        height: '100%'
    }
}));

const FormController = (props) => {
    const [form, setForm] = useState(null);
    const [currentPage, setCurrentPage] = useState(null)
    const [modalOpen, setModalOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentField, setCurrentField] = useState(null);
    const [deleteType, setDeleteType] = useState(null);
    const [mode, setMode] = useState(null);
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        if(!form){
            if(sessionStorage.getItem('currentForm')){
                setForm(JSON.parse(sessionStorage.getItem('currentForm')));
                setCurrentPage(0);
            }else if(props.id){
                let newForm = props.forms.find(form => form.id === props.id);
                newForm.pages = JSON.parse(newForm.pages);
                sessionStorage.setItem('currentForm', JSON.stringify(newForm));
                setForm(newForm);
                setCurrentPage(0);
            }else if(props.isNewForm){
                let newForm = {
                    name: 'New form',
                    categoryID: '1',
                    pages: [
                        {
                            name: 'Page 1',
                            fields: []
                        }
                    ]
                };
                sessionStorage.setItem('currentForm', JSON.stringify(newForm));
                setForm(newForm);
                setCurrentPage(0);
            }else{
                console.log('form cannot be found');
            }
        }else if(form && typeof form.pages === 'string'){
            let formsCopy = {...form};
            formsCopy.pages = JSON.parse(formsCopy.pages);
        }
    }, [props.id, form, props.forms, props.isNewForm]);

    const addPage = () => {
        let formCopy = {...form};
        let newPage = {
            name: `Page ${formCopy.pages.length+1}`,
            fields: []
        };
        formCopy.pages.push(newPage);
        setForm(formCopy);
        sessionStorage.setItem('currentForm', JSON.stringify(formCopy));
        setCurrentPage(formCopy.pages.length -1);
    }

    const changePage = (page) => {
        setCurrentPage(page);
    }

    const addField = (pageIndex, index) => {
        setCurrentField(index);
        setMode('add');
        setModalOpen(true);
    }

    const handleModal = (open, save=false, field, fieldIndex, pageIndex) => {
        if(save && field && fieldIndex !== null && pageIndex !== null){
            let formCopy = {...form};
            if(mode === 'add' && formCopy.pages[pageIndex].fields[fieldIndex]){
                formCopy.pages[pageIndex].fields[fieldIndex+1] = formCopy.pages[pageIndex].fields[fieldIndex];
            }
            formCopy.pages[pageIndex].fields[fieldIndex] = field;
            setForm(formCopy);
            sessionStorage.setItem('currentForm', JSON.stringify(formCopy));
        }
        setMode(null);
        setModalOpen(open);
    }

    const handleCancel = (type) => {
        switch(type){
            case 'dialog':
                setDialogOpen(false);
            break;
            case 'modal':
                setModalOpen(false);
            break;
            case 'form':
                sessionStorage.removeItem('currentForm');
                if(props.edit && props.id){
                    history.push(`/admin/forms/${props.id}`);
                }else{
                    history.push('/admin/forms')
                }
            break;
            default:
            return;
        }
    }

    const handleSave = () => {
        sessionStorage.removeItem('currentForm');
        if(props.edit && props.id){
            props.onFormSave(form, props.id);
        }else{
            props.onFormSave(form);
        }
    }

    const handleEdit = () => {
        history.push(`/admin/forms/${props.id}/edit`);
    }

    const handleDelete = (pageIndex, fieldIndex) => {
        let formCopy = {...form};
        switch(deleteType){
            case 'field':
                formCopy.pages[pageIndex].fields.splice(fieldIndex,1);
                setDialogOpen(false);
                setDeleteType(null);
                setCurrentField(null);
                setForm(formCopy);
                sessionStorage.setItem('currentForm', JSON.stringify(formCopy));
            break;
            case 'page':
                if(formCopy.pages.length > 1){
                    formCopy.pages.splice(pageIndex, 1);
                    if(!formCopy.pages[pageIndex]){
                        setCurrentPage(0);
                    }
                    setForm(formCopy);
                    sessionStorage.setItem('currentForm', JSON.stringify(formCopy));
                    setDialogOpen(false);
                }else{
                    console.log('cannot remove page, no other pages present');
                }
            break;
            case 'form':
                props.onFormDelete(props.id);
            break;
        }
    }

    const getDeleteTitle = () => {
        switch(deleteType){
            case 'form':
                return (<DialogTitle>Delete form</DialogTitle>);
            case 'page':
                return (<DialogTitle>Delete page</DialogTitle>);
            case 'field':
                return (<DialogTitle>Delete form</DialogTitle>);
        }
    }

    const handleEditField = (fieldIndex) => {
        setCurrentField(fieldIndex);
        setMode('edit');
        setModalOpen(true);
    }

    const handleDeleteField = (fieldIndex) => {
        setCurrentField(fieldIndex);
        setDeleteType('field');
        setDialogOpen(true);
    }

    const handleDeletePage = () => {
        setDeleteType('page');
        setDialogOpen(true);
    }

    const handleChange = (event) => {
        if((currentPage || currentPage === 0) && event.target.name === `page-${currentPage}-title`){
            let formCopy = {...form};
            formCopy.pages[currentPage].name = event.target.value;
            setForm(formCopy);
        }else if(event.target.name === 'form-name'){
            let formCopy = {...form};
            formCopy.name = event.target.value;
            setForm(formCopy);
        }
    }

    return (
        <React.Fragment>
            {(props.edit && props.id) || props.isNewForm ? (
                <div className="formControlButtonsContainer">
                    <Button variant="contained" onClick={e => handleCancel('form')}>Cancel</Button>
                    <Button variant="contained" onClick={e => handleSave()}>Save</Button>
                </div>
            ) : (
                <div className="formControlButtonsContainer">
                    <Button variant="contained" onClick={e => {
                        setDeleteType('form');
                        setDialogOpen(true);
                    }}>Delete</Button>
                    <Button variant="contained" onClick={e => handleEdit()}>Edit</Button>
                </div>
            )}
            {form ? (
                <React.Fragment>
                    {props.edit ? (
                        <form className="editForm" noValidate autoComplete="off">
                            <TextField className="titleTextField" onChange={handleChange} id="name" name="form-name" label="Name" value={form.name} />
                            <List component="nav">
                                <ListItem button onClick={e => addPage()}>
                                    <ListItemIcon><Add></Add></ListItemIcon>
                                    <ListItemText primary="Add page" />                                
                                </ListItem>
                            </List>
                            {form.pages && form.pages.length > 0 && typeof form.pages !== 'string' ? form.pages.map((page, pageIndex) => {
                                if(currentPage === pageIndex){
                                    return (
                                        <Paper key={`page-${pageIndex}`} className="pageCard">
                                            {form.pages.length > 1 ? (
                                                <div className="pageDeleteButtonContainer">
                                                    <Button variant="contained" onClick={e => handleDeletePage()}>Delete page</Button>
                                                </div>
                                            ) : ''}
                                            <TextField id={`Page${pageIndex}_name`} onChange={handleChange} label="Page name" name={`page-${pageIndex}-title`} value={page.name} />
                                            {page.fields && page.fields.length > 0 ? page.fields.map((field, index) => (
                                                <React.Fragment key={`field-${index}`}>
                                                    {index === 0 ? (
                                                    <List component="nav">
                                                        <ListItem button onClick={e => addField(pageIndex, index)}>
                                                            <ListItemIcon><Add></Add></ListItemIcon>
                                                            <ListItemText primary="Add field" />                                
                                                        </ListItem>
                                                    </List>
                                                    ) : ''}
                                                    <FieldDisplay field={field} pageIndex={pageIndex} fieldIndex={index} onEditClicked={handleEditField} onDeleteClicked={handleDeleteField} />
                                                    <List component="nav">
                                                        <ListItem button onClick={e => addField(pageIndex, index+1)}>
                                                            <ListItemIcon><Add></Add></ListItemIcon>
                                                            <ListItemText primary="Add field" />                                
                                                        </ListItem>
                                                    </List>
                                                </React.Fragment>

                                            )) : (
                                                <List component="nav">
                                                    <ListItem button onClick={e => addField(pageIndex, 0)}>
                                                        <ListItemIcon><Add></Add></ListItemIcon>
                                                        <ListItemText primary="Add field" />                                
                                                    </ListItem>
                                                </List>
                                            )}
                                        </Paper>
                                    )
                                }
                                return '';
                            }
                            ) : ''}
                        </form>
                    ) : (
                        <form className="editForm" noValidate autoComplete="off">
                            <Typography variant="h2">{form.name}</Typography>
                            {form.pages && form.pages.length > 0 && typeof form.pages !== 'string' ? form.pages.map((page, pageIndex) => {
                                if(currentPage === pageIndex){
                                    return (
                                        <Paper key={`page-${pageIndex}`} className="pageCard">
                                            <Typography variant="h3">{page.name}</Typography>
                                            {page.fields && page.fields.length > 0 ? page.fields.map((field, index) => (
                                                    <FieldDisplay field={field} pageIndex={pageIndex} fieldIndex={index} onEditClicked={handleEditField} onDeleteClicked={handleDeleteField} />
                                            )): ''}
                                        </Paper>
                                    )
                                }
                                return '';
                            }
                            ) : ''}
                        </form>
                    )}
                    {form.pages && typeof form.pages !== 'string' && form.pages.length > 1 ? (
                        <Grid container>
                            <Grid item xs={6}>
                                {currentPage -1 > -1 ? (
                                    <ListItem button onClick={e => changePage(currentPage -1)}>
                                        <ListItemIcon><ArrowBackIosIcon></ArrowBackIosIcon></ListItemIcon>
                                        <ListItemText primary={form.pages[currentPage - 1].name}></ListItemText>
                                    </ListItem>
                                ) : ''}
                            </Grid>
                            <Grid item xs={6}>
                                {currentPage + 2 <= form.pages.length ? (
                                    <ListItem button onClick={e => changePage(currentPage +1)}>
                                        <ListItemText primaryTypographyProps={{align: 'right'}} primary={form.pages[currentPage + 1].name}></ListItemText>
                                        <ListItemIcon><ArrowForwardIosIcon></ArrowForwardIosIcon></ListItemIcon>
                                    </ListItem>
                                ): ''}
                            </Grid>
                        </Grid>
                    ) : ''}

                    <Modal
                        open={modalOpen}
                        onClose={e => handleModal(false)}
                        className="modalWindow"
                        >
                        {currentField !== null ?
                            (mode && mode === 'add' ? (
                                <DialogContent className={classes.root}>
                                    <FieldController onFormSubmit={handleModal} onCancel={handleCancel} field={{id: null, label: null, type: null, required: false}} pageIndex={currentPage} fieldIndex={currentField} />
                                </DialogContent>
                            ) : (
                                <DialogContent className={classes.root}>
                                    <FieldController onFormSubmit={handleModal} edit={true} onCancel={handleCancel} field={currentField !== null && currentPage !== null && form && form.pages && typeof form.pages !== 'string' ? form.pages[currentPage].fields[currentField] : null} pageIndex={currentPage} fieldIndex={currentField} />
                                </DialogContent>
                            ))
                             : (<div></div>)}
                    </Modal>
                    <Dialog
                        open={dialogOpen}
                        onClose={e => setDialogOpen(false)}
                        >
                            {getDeleteTitle()}
                            {deleteType === 'field' && currentField ? (
                                <DialogContent>
                                    <Typography>Are you sure you want to delete the field "{form.pages[currentPage].fields[currentField].label}"?</Typography>
                                    <div className="dialogActionsContainer">
                                        <Button onClick={e => handleDelete(currentPage, currentField)}>Confirm</Button>
                                        <Button onClick={e => handleCancel('dialog')}>Cancel</Button>
                                    </div>
                                </DialogContent>
                            ) : (deleteType === 'page' && currentPage ? (
                                <DialogContent>
                                    <Typography>Are you sure you want to delete the page "{form.pages[currentPage].name}"?</Typography> 
                                    <div className="dialogActionsContainer">
                                        <Button onClick={e => handleDelete(currentPage, currentField)}>Confirm</Button>
                                        <Button onClick={e => handleCancel('dialog')}>Cancel</Button>
                                    </div>
                                </DialogContent>
                            ) : (
                                <DialogContent>
                                    <Typography>Are you sure you want to delete the form "{form.name}"?</Typography> 
                                        <div className="dialogActionsContainer">
                                        <Button onClick={e => handleDelete(currentPage, currentField)}>Confirm</Button>
                                        <Button onClick={e => handleCancel('dialog')}>Cancel</Button>
                                    </div>
                                </DialogContent>
                            ))}
                        </Dialog>
                </React.Fragment>
            ) : (
                <p>Error: form cannot be found with that ID.</p>
            )}
        </React.Fragment>
    )
}

export default FormController;