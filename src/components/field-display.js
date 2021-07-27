import { FormControl, TextField, Select, Typography, FormGroup, InputLabel, MenuItem, Fab } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import React from "react";

const FieldDisplay = (props) => {
    let field;
    const handleEdit = () => {
        console.log(props.fieldIndex);
        if(props.fieldIndex || props.fieldIndex === 0){
            props.onEditClicked(props.fieldIndex)
        }
    }
    const handleDelete = () => {
        if(props.fieldIndex || props.fieldIndex === 0){
            props.onDeleteClicked(props.fieldIndex);
        }
    }
    if(props.field && props.field.type){
        switch(props.field.type){
            case 'textfield':
                field = (
                    <FormControl fullWidth={true}>
                        {props.field.required ? (
                            <React.Fragment>
                                <TextField required />
                                <div className="fieldActionsContainer">
                                    <Fab size="small" onClick={e => handleEdit()}>
                                        <EditIcon size="small"></EditIcon>
                                    </Fab>
                                    <Fab size="small" onClick={e => handleDelete()}>
                                        <DeleteIcon size="small"></DeleteIcon>
                                    </Fab>
                                </div>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <TextField />
                                <div className="fieldActionsContainer">
                                    <Fab size="small" onClick={e => handleEdit()}>
                                        <EditIcon size="small"></EditIcon>
                                    </Fab>
                                    <Fab size="small" onClick={e => handleDelete()}>
                                        <DeleteIcon size="small"></DeleteIcon>
                                    </Fab>
                                </div>
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
                                        <div className="fieldActionsContainer">
                                            <Fab size="small" onClick={e => handleEdit()}>
                                                <EditIcon size="small"></EditIcon>
                                            </Fab>
                                            <Fab size="small" onClick={e => handleDelete()}>
                                                <DeleteIcon size="small"></DeleteIcon>
                                            </Fab>
                                        </div>
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
                                        <div className="fieldActionsContainer">
                                            <Fab size="small" onClick={e => handleEdit()}>
                                                <EditIcon size="small"></EditIcon>
                                            </Fab>
                                            <Fab size="small" onClick={e => handleDelete()}>
                                                <DeleteIcon size="small"></DeleteIcon>
                                            </Fab>
                                        </div>
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
                                <div className="fieldActionsContainer">
                                    <Fab size="small" onClick={e => handleEdit()}>
                                        <EditIcon size="small"></EditIcon>
                                    </Fab>
                                    <Fab size="small" onClick={e => handleDelete()}>
                                        <DeleteIcon size="small"></DeleteIcon>
                                    </Fab>
                                </div>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <TextField rowsMax={4} rows={3} fullWidth={true} multiline={true} required />
                                <div className="fieldActionsContainer">
                                    <Fab size="small" onClick={e => handleEdit()}>
                                        <EditIcon size="small"></EditIcon>
                                    </Fab>
                                    <Fab size="small" onClick={e => handleDelete()}>
                                        <DeleteIcon size="small"></DeleteIcon>
                                    </Fab>
                                </div>
                            </React.Fragment>
                        )}
                    </FormControl>
                );
            break;
            default:
                return (
                    <div></div>
                )
        }
    }
    return (
        <React.Fragment>
            {props.field && props.field.label ? (
                <Typography variant="h3" className="fieldDisplayLabel">{props.field.label}</Typography>
            ) : ''}
            {field ? field : ''}
        </React.Fragment>
    )
}

export default FieldDisplay