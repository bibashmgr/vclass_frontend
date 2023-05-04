import React, { useState } from 'react';

//layouts
import FormLayout from '../../../layouts/crud_layouts/FormLayout';

// components
import InputField from '../../../components/global/InputField';

// helpers
import { apiHandler } from '../../../handlers/apiHandler';
import { showMessage } from '../../../handlers/messageHandler';
import { facultySchema } from '../../../utils/schemas';

const FacultyCreate = () => {
    const [faculty, setFaculty] = useState({
        name: '',
        semesters: [],
        desc: '',
    });

    const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFaculty((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCreateFaculty = (e: React.MouseEvent) => {
        e.preventDefault();
        apiHandler('post', 'faculties/create', faculty).then((res) => {
            if (res.success) {
                showMessage(res.message, 'success');
                setFaculty({
                    name: '',
                    semesters: [],
                    desc: '',
                });
            } else {
                showMessage(res.message, 'failure');
            }
        });
    };

    return (
        <FormLayout
            layoutTitle='Create Faculty'
            layoutSubtitle='Fill out the forms'
            handleSubmit={handleCreateFaculty}
            isEdit={false}
        >
            <InputField
                hasLabel
                label='Name'
                name='name'
                value={faculty.name}
                handleChange={handleInputField}
            />
            <InputField
                hasLabel
                label='Description'
                type='textarea'
                name='desc'
                value={faculty.desc}
                handleChange={handleInputField}
                extraStyling='lg:col-span-2'
            />
        </FormLayout>
    );
};

export default FacultyCreate;
