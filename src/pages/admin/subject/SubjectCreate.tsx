import React, { useState } from 'react';

//layouts
import FormLayout from '../../../layouts/crud_layouts/FormLayout';

// components
import InputField from '../../../components/global/form/InputField';

// helpers
import { apiHandler } from '../../../handlers/apiHandler';
import { showMessage } from '../../../handlers/messageHandler';

const SubjectCreate = () => {
  const [subject, setSubject] = useState({
    name: '',
    codeName: '',
    desc: '',
  });

  const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    apiHandler('post', 'subjects/create', subject).then((res) => {
      if (res.success) {
        showMessage(res.message, 'success');
        setSubject({
          name: '',
          codeName: '',
          desc: '',
        });
      } else {
        showMessage(res.message, 'failure');
      }
    });
  };

  return (
    <FormLayout
      layoutTitle='Create Subject'
      layoutSubtitle='Fill out the forms'
      handleSubmit={handleCreateSubject}
    >
      <InputField
        hasLabel
        label='Name'
        name='name'
        value={subject.name}
        handleChange={handleInputField}
      />
      <InputField
        hasLabel
        label='Code Name'
        name='codeName'
        value={subject.codeName}
        handleChange={handleInputField}
      />
      <InputField
        hasLabel
        label='Description'
        type='textarea'
        name='desc'
        value={subject.desc}
        handleChange={handleInputField}
        extraStyling='lg:col-span-2'
      />
    </FormLayout>
  );
};

export default SubjectCreate;
