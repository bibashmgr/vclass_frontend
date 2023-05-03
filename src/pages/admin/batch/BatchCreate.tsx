import React, { useState, useEffect } from 'react';

//layouts
import FormLayout from '../../../layouts/crud_layouts/FormLayout';

// components
import InputField from '../../../components/global/InputField';
import SelectField from '../../../components/global/SelectField';

// helpers
import { apiHandler } from '../../../handlers/apiHandler';
import { showMessage } from '../../../handlers/messageHandler';


const BatchCreate = () => {
    const [batch, setBatch] = useState({
        name: '',
        faculty: '',
        desc: '',
    });
    const [faculties, setFaculties] = useState([]);

    const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBatch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCreateSubject = (e: React.MouseEvent) => {
        e.preventDefault();
        apiHandler('post', 'subjects/create', batch).then((res) => {
            if (res.success) {
                showMessage(res.message, 'success');
                setBatch({
                    name: '',
                    faculty: '',
                    desc: '',
                });
            } else {
                showMessage(res.message, 'failure');
            }
        });
    };

    const getFaculties = async () => {
        await apiHandler('get', 'faculties', null).then((res) => {
            if (res.success) {
                setFaculties(res.data);
            }
        })
    }

    useEffect(() => {
        getFaculties()
    }, []);

    return (
        <FormLayout
            layoutTitle='Create Subject'
            layoutSubtitle='Fill out the forms'
            handleSubmit={handleCreateSubject}
            isEdit={false}
        >
            <InputField
                hasLabel
                label='Name'
                name='name'
                value={batch.name}
                handleChange={handleInputField}
            />
            <SelectField hasLabel label='Faculty' name='faculty' value={batch.faculty} handleSelect={handleInputField} options={faculties} />
            <InputField
                hasLabel
                label='Description'
                type='textarea'
                name='desc'
                value={batch.desc}
                handleChange={handleInputField}
                extraStyling='lg:col-span-2'
            />
        </FormLayout>
    );
};

export default BatchCreate;
