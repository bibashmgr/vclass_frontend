import React, { useState, useEffect } from 'react';

//layouts
import FormLayout from '../../../layouts/crud_layouts/FormLayout';

// components
import InputField from '../../../components/global/form/InputField';
import SelectField from '../../../components/global/form/SelectField';

// helpers
import { apiHandler } from '../../../handlers/apiHandler';
import { showMessage } from '../../../handlers/messageHandler';

// utils
import { facultySchema } from '../../../utils/schemas';

const BatchCreate = () => {
  const [batch, setBatch] = useState({
    year: '',
    faculty: '',
    currentSemester: '',
    desc: '',
  });
  const [faculties, setFaculties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBatch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    apiHandler('post', 'batches/create', {
      ...batch,
      year: Number(batch.year),
      currentSemester: Number(batch.currentSemester),
    }).then((res) => {
      if (res.success) {
        showMessage(res.message, 'success');
        setBatch({
          year: '',
          faculty: '',
          currentSemester: '',
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
        let mappingFaculties = res.data.map((data: facultySchema) => {
          return {
            title: data.name,
            value: data._id,
          };
        });
        setFaculties(mappingFaculties);
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
        type='number'
        label='Year'
        name='year'
        value={batch.year}
        handleChange={handleInputField}
      />
      <SelectField
        hasLabel
        label='Faculty'
        name='faculty'
        value={batch.faculty}
        handleSelect={handleInputField}
        options={faculties}
      />
      <InputField
        type='number'
        hasLabel
        label='Current Semester'
        name='currentSemester'
        value={batch.currentSemester}
        handleChange={handleInputField}
        extraStyling='lg:col-span-2'
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
