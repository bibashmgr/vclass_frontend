import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//layouts
import FormLayout from '../../../layouts/crud_layouts/FormLayout';

// components
import CustomInputField from '../../../components/global/InputField';

// helpers
import { apiHandler } from '../../../handlers/apiHandler';

const SubjectEdit = () => {
  const params = useParams();
  const [subject, setSubject] = useState({
    name: '',
    codeName: '',
  });

  const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditSubject = (e: React.MouseEvent) => {
    e.preventDefault();
    apiHandler('patch', `subjects/${params.id}`, subject).then((res) => {
      if (res.success) {
        setSubject({
          name: '',
          codeName: '',
        });
      }
    });
  };

  useEffect(() => {
    apiHandler('get', `subjects/${params.id}`, null).then((res) => {
      if (res.success) {
        setSubject({
          name: res.data.name,
          codeName: res.data.codeName,
        });
      }
    });
  }, []);

  return (
    <FormLayout
      layoutTitle='Edit Subject'
      layoutSubtitle='Fill out the forms'
      handleSubmit={handleEditSubject}
      isEdit={true}
    >
      <CustomInputField
        hasLabel
        label='Name'
        name='name'
        value={subject.name}
        handleChange={handleInputField}
      />
      <CustomInputField
        hasLabel
        label='Code Name'
        name='codeName'
        value={subject.codeName}
        handleChange={handleInputField}
      />
    </FormLayout>
  );
};

export default SubjectEdit;
