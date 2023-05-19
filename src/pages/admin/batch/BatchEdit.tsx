import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

const BatchEdit = () => {
  const params = useParams();

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

  const handleEditBatch = (e: React.FormEvent) => {
    e.preventDefault();

    apiHandler('patch', `batches/${params.batchId}`, {
      ...batch,
      year: Number(batch.year),
      currentSemester: Number(batch.currentSemester),
    }).then((res) => {
      if (res.success) {
        showMessage(res.message, 'success');
      } else {
        showMessage(res.message, 'failure');
      }
    });
  };

  const fetchData = async () => {
    await apiHandler('get', 'faculties', null).then((res) => {
      if (res.success) {
        let mappingFaculties = res.data.map((data: facultySchema) => {
          return {
            title: data.name,
            value: data._id,
          };
        });
        setFaculties(mappingFaculties);
      } else {
        showMessage(res.message, 'failure');
      }
    });

    await apiHandler('get', `batches/${params.batchId}`, null).then((res) => {
      if (res.success) {
        setBatch({
          year: res.data.year,
          faculty: res.data.faculty._id,
          currentSemester: res.data.currentSemester,
          desc: res.data.desc,
        });
        setIsLoading(false);
      } else {
        showMessage(res.message, 'failure');
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <FormLayout
      layoutTitle='Edit Batch'
      layoutSubtitle='Fill out the forms'
      handleSubmit={handleEditBatch}
      isEdit={true}
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

export default BatchEdit;
