import { FormControl, TextField, Select, Typography, FormGroup, InputLabel, MenuItem, Button } from "@material-ui/core";
import React from "react";

const FieldDisplay = (props) => {
    let field;
    const handleEdit = () => {
        if(props.id){
            props.onEditClicked(props.fieldIndex)
        }
    }
    const handleDelete = () => {
        props.onDeleteClicked(props.fieldIndex);
    }
    if(props.field && props.field.type){
        switch(props.field.type){
            case 'textfield':
                field = (
                    <FormControl fullWidth={true}>
                        {props.field.required ? (
                            <React.Fragment>
                                <TextField required />
                                <Button variant="contained" onClick={e => handleEdit}>Edit</Button>
                                <Button variant="contained" onClick={e => handleDelete}>Delete</Button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <TextField />
                                <Button variant="contained" onClick={e => handleEdit}>Edit</Button>
                                <Button variant="contained" onClick={e => handleDelete}>Delete</Button>
                            </React.Fragment>
                        )}
                    </FormControl>
                );
            break;
            case 'select':
                field = (
                        <React.Fragment>
                            {props.field.required ? (
                                <FormGroup>
                                    <FormControl fullWidth={true}>
                                        <InputLabel id={props.field.label.replace(' ', '-')}>{props.field.label}</InputLabel>
                                        <Select
                                        labelId={props.field.label.replace(' ', '-')}
                                        id={props.field.label.replace(' ', '-')}
                                        name={props.field.label.replace(' ', '_')}
                                        onClick={e => e.stopPropagation()}
                                        required
                                        >
                                            {props.field.values && props.field.values.length > 0 ? props.field.values.map(value => (
                                                <MenuItem key={value.key} value={value.key}>{value.value}</MenuItem>
                                            )) : ''}
                                        </Select>
                                        <Button variant="contained" onClick={e => handleEdit}>Edit</Button>
                                        <Button variant="contained" onClick={e => handleDelete}>Delete</Button>
                                    </FormControl>
                                </FormGroup>
                            ) : (
                                <FormGroup>
                                    <FormControl fullWidth={true}>
                                        <InputLabel id={props.field.label.replace(' ', '-')}>{props.field.label}</InputLabel>
                                        <Select
                                        labelId={props.field.label.replace(' ', '-')}
                                        id={props.field.label.replace(' ', '-')}
                                        name={props.field.label.replace(' ', '_')}
                                        onClick={e => e.stopPropagation()}
                                        >
                                            {props.field.values && props.field.values.length > 0 ? props.field.values.map(value => (
                                                <MenuItem key={value.key} value={value.key}>{value.value}</MenuItem>
                                            )) : ''}
                                        </Select>
                                        <Button variant="contained" onClick={e => handleEdit}>Edit</Button>
                                        <Button variant="contained" onClick={e => handleDelete}>Delete</Button>
                                    </FormControl>
                                </FormGroup>
                            )}
                        </React.Fragment>
                );
            break;
            case 'textarea':
                field = (
                    <FormControl fullWidth={true}>
                        {props.field.required ? (
                            <React.Fragment>
                                <TextField rowsMax={4} rows={3} fullWidth={true} multiline={true} required />
                                <Button variant="contained" onClick={e => handleEdit}>Edit</Button>
                                <Button variant="contained" onClick={e => handleDelete}>Delete</Button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <TextField rowsMax={4} rows={3} fullWidth={true} multiline={true} required />
                                <Button variant="contained" onClick={e => handleEdit}>Edit</Button>
                                <Button variant="contained" onClick={e => handleDelete}>Delete</Button>
                            </React.Fragment>
                        )}
                    </FormControl>
                );
            break;
            
        }
    }
    return (
        <React.Fragment>
            {props.field && props.field.label ? (
                <Typography variant="h3">{props.field.label}</Typography>
            ) : ''}
            {field ? field : ''}
        </React.Fragment>
    )
}

export default FieldDisplay