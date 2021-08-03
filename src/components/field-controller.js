import { TextField, Select, Checkbox, InputLabel, FormControl, FormControlLabel, MenuItem, Button, List, ListItem, ListItemIcon, ListItemText, FormGroup, Grid, Paper, makeStyles, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'; 
import Add from '@material-ui/icons/Add';
import React, { useState } from 'react';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginLeft: '0px'
    }
});

const FieldController = React.forwardRef((props, ref) => {
    const [field, setField] = useState(props.field ? props.field : null);
    const classes=useStyles();
    const handleChange = (event) => {
        let value = event.target.value;
        let fieldCopy = {...field};
        fieldCopy[event.target.name] = value;
        setField(fieldCopy);
    }
    const handleChecked = (event) => {
        let checkbox = event.target;
        let checked = checkbox.checked;
        let fieldCopy = {...field};
        fieldCopy[checkbox.name] = (checked ? true : false);
        setField(fieldCopy);
    }
    const addValue = () => {
        let fieldCopy = {...field};
        if(!fieldCopy.values || (fieldCopy.values && fieldCopy.values.length === 0)){
            fieldCopy.values = [{
                key: 'value_1',
                value: 'New value'
            }];
        }else{
            fieldCopy.values.push({
                key: `value_${fieldCopy.values.length+1}`,
                value: 'New value'
            });
        }
        setField(fieldCopy);
    }
    const handleValueChange = (event, prop, index) => {
        let fieldCopy = {...field};
        fieldCopy.values[index][prop] = event.target.value;
        setField(fieldCopy);
    }

    const handleCancel = (event) => {
        event.preventDefault();
        props.onCancel('modal');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onFormSubmit(false, true, field, props.fieldIndex, props.pageIndex);
    }

    const exitModal = event => {
        props.onFormSubmit(false);
    }

    const stopEventPropagation = e => {
        e.stopPropagation();
    } 
    return (
        <Grid container className="modalCardContainer" ref={ref}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                <Paper className="modalCard">
                    <div className="closeButtonContainer">
                        <IconButton color="primary" onClick={e => exitModal(e)}>
                            <CloseIcon></CloseIcon>
                        </IconButton>
                    </div>
                    <form onSubmit={e => handleSubmit(e)}>
                        <TextField id="id" label="Field id" onChange={handleChange} name="id" value={field.id ? field.id : ''} />
                        <TextField id="label" label="Label" onChange={handleChange} name="label" value={field.label ? field.label : ''} />
                        <FormGroup>
                            <FormControl>
                                <InputLabel id="type-label">Type</InputLabel>
                                <Select
                                labelId="type-label"
                                id="type"
                                name="type"
                                value={field.type ? field.type : ''}
                                onClick={e => stopEventPropagation(e)}
                                onChange={handleChange}
                                >
                                    <MenuItem value={'textfield'}>Textfield</MenuItem>
                                    <MenuItem value={'textarea'}>Textarea</MenuItem>
                                    <MenuItem value={'select'}>Select</MenuItem>
                                </Select>
                            </FormControl>
                        </FormGroup>
                        {field.type && field.type === 'select' ? (
                            <React.Fragment>
                                <List component="nav">
                                    <ListItem button onClick={e => addValue()}>
                                        <ListItemIcon><Add></Add></ListItemIcon>
                                        <ListItemText primary="Add value to select list" />                                
                                    </ListItem>
                                </List>
                                {field.values && field.values.length > 0 ? field.values.map((value, index) => {
                                    return (
                                        <React.Fragment>
                                            <TextField key={`value-${index}-key`} id={`value-${index}-key`} name={`values-${index}-key`} label="key" onChange={e => handleValueChange(e, 'key', index)} value={value.key} />
                                            <TextField key={`value-${index}-value`} id={`value-${index}-value`} name={`values-${index}-key`} label="value" onChange={e =>handleValueChange(e, 'value', index)} value={value.value} />
                                        </React.Fragment>
                                    )
                                }): ''}
                            </React.Fragment>
                        ) : ''}
                        <FormControl fullWidth={true}>
                            <FormControlLabel classes={classes} label="Required" labelPlacement="start" control={<Checkbox checked={field.required} color="primary" onChange={handleChecked} name="required" id="required" />} />
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary">{props.edit ? 'Add field' : 'Save'}</Button>
                        <Button variant="contained" onClick={e => handleCancel(e)}>Cancel</Button>                 
                    </form>
                </Paper>
            </Grid>
            <Grid item xs={3}></Grid>
        </Grid>
    )
})

export default FieldController