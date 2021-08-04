import { TextField, Select, Checkbox, InputLabel, FormControl, FormControlLabel, MenuItem, Button, List, ListItem, ListItemIcon, ListItemText, FormGroup, Grid, Paper, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'; 
import Add from '@material-ui/icons/Add';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginLeft: '0px'
    }
});

const RuleController = React.forwardRef((props, ref) => {
    const [rule, setRule] = useState(props.rule ? props.rule : null);
    const classes=useStyles();

    const handleChange = (event) => {
        let value = event.target.value;
        let ruleCopy = {...rule};
        ruleCopy[event.target.name] = value;
        setRule(ruleCopy);
    }
    const handleChecked = (event) => {
        let checkbox = event.target;
        let checked = checkbox.checked;
        let ruleCopy = {...rule};
        ruleCopy[checkbox.name] = (checked ? true : false);
        setRule(ruleCopy);
    }
    const handleValueChange = (event, prop, index) => {
        let ruleCopy = {...rule};
        ruleCopy.values[index][prop] = event.target.value;
        setRule(ruleCopy);
    }

    const handleCancel = (event) => {
        event.preventDefault();
        props.onCancel('modal');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onFormSubmit(false, true, rule, props.ruleIndex, props.pageIndex);
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
                        <TextField id="label" label="Label" onChange={handleChange} name="label" value={rule.label ? rule.label : ''} />
                        <h3>If:</h3>
                        <FormGroup>
                            <FormControl>
                                <InputLabel id="condition-label">Condition</InputLabel>
                                <Select
                                labelId="condition-label"
                                id="conditions"
                                name="conditions"
                                value={rule.conditions && rule.conditions.length ? rule.type : ''}
                                onClick={e => stopEventPropagation(e)}
                                onChange={handleChange}
                                >
                                    <MenuItem value={'user_submits'}>User submits the form</MenuItem>
                                </Select>
                            </FormControl>
                        </FormGroup>
                        <FormControl fullWidth={true}>
                            <FormControlLabel classes={classes} label="Enabled" labelPlacement="start" control={<Checkbox checked={rule.enabled} color="primary" onChange={handleChecked} name="enabled" id="enabled" />} />
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary">{props.edit ? 'Add rule' : 'Save'}</Button>
                        <Button variant="contained" onClick={e => handleCancel(e)}>Cancel</Button>                 
                    </form>
                </Paper>
            </Grid>
            <Grid item xs={3}></Grid>
        </Grid>
    )
})

export default RuleController