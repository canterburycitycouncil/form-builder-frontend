

const freshdeskIntegration = async (formValues, customFields, id) => {
    return new Promise(async (resolve, reject) => {
        if(customFields){
            let customFieldsArray = customFields.split(',');
            customFieldsArray.forEach(field => {
                if(!formValues.custom_field){
                    formValues.custom_field = {};
                }
                formValues.custom_field[field] = formValues[field];
                delete formValues[field];
            });
        }
        fetch('https://bxz1wuvcx5.execute-api.eu-west-2.amazonaws.com/alpha/ticket', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                formValues: {
                    ...formValues,
                    ticket_type:id
                }
            })
        }).then(res => {
            resolve(res.json());
        }).catch(err => {
            reject(err);
        });
    });
}

export default freshdeskIntegration;