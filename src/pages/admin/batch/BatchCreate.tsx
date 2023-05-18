import React, { useState, useEffect } from 'react';

//layouts
import FormLayout from '../../../layouts/crud_layouts/FormLayout';

// components
import InputField from '../../../components/global/form/InputField';
import SelectField from '../../../components/global/form/SelectField';

// helpers
import { apiHandler } from '../../../handlers/apiHandler';
import { showMessage } from '../../../handlers/messageHandler';
import { facultySchema } from '../../../utils/schemas';

const BatchCreate = () => {
  const [batch, setBatch] = useState({
    name: '',
    faculty: '',
    desc: '',
  });
  const [faculties, setFaculties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBatch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    apiHandler('post', 'batches/create', batch).then((res) => {
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
        setIsLoading(false);
      } else {
        showMessage(res.message, 'failure');
      }
    });
  };

  useEffect(() => {
    getFaculties();
  }, []);

  return (
    <FormLayout
      layoutTitle='Create Batch'
      layoutSubtitle='Fill out the forms'
      handleSubmit={handleCreateBatch}
      isEdit={false}
      isLoading={isLoading}
    >
      <InputField
        hasLabel
        label='Name'
        name='name'
        value={batch.name}
        handleChange={handleInputField}
      />
      <SelectField
        hasLabel
        label='Faculty'
        name='faculty'
        value={batch.faculty}
        handleSelect={handleInputField}
        options={faculties.map((faculty: facultySchema) => {
          return {
            title: faculty.name,
            value: faculty._id,
          };
        })}
      />
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
