import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//layouts
import FormLayout from '../../../layouts/crud_layouts/FormLayout';

// components
import InputField from '../../../components/global/InputField';

// helpers
import { apiHandler } from '../../../handlers/apiHandler';

const SubjectEdit = () => {
  const params = useParams();
  const [subject, setSubject] = useState({
    name: '',
    codeName: '',
    desc: '',
  });

  const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditSubject = (e: React.MouseEvent) => {
    e.preventDefault();
    apiHandler('patch', `subjects/${params.id}`, subject).then((res) => {
      if (res.success) {
        setSubject({
          name: res.data.name,
          codeName: res.data.codeName,
          desc: res.data.desc,
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
          desc: res.data.desc,
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

export default SubjectEdit;
