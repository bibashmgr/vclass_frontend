import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//layouts
import FormLayout from '../../../layouts/crud_layouts/FormLayout';

// components
import InputField from '../../../components/global/form/InputField';

// helpers
import { apiHandler } from '../../../handlers/apiHandler';
import { showMessage } from '../../../handlers/messageHandler';

const SubjectEdit = () => {
  const params = useParams();

  const [subject, setSubject] = useState({
    name: '',
    codeName: '',
    desc: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditSubject = (e: React.FormEvent) => {
    e.preventDefault();
    apiHandler('patch', `subjects/${params.id}`, subject).then((res) => {
      if (res.success) {
        setSubject({
          name: res.data.name,
          codeName: res.data.codeName,
          desc: res.data.desc,
        });
      } else {
        showMessage(res.message, 'failure');
      }
    });
  };

  const getSubjects = async () => {
    await apiHandler('get', `subjects/${params.subjectId}`, null).then(
      (res) => {
        if (res.success) {
          setSubject({
            name: res.data.name,
            codeName: res.data.codeName,
            desc: res.data.desc,
          });
          setIsLoading(false);
        } else {
          showMessage(res.message, 'failure');
        }
      }
    );
  };

  useEffect(() => {
    getSubjects();
  }, []);

  return (
    <FormLayout
      layoutTitle='Edit Subject'
      layoutSubtitle='Fill out the forms'
      handleSubmit={handleEditSubject}
      isEdit={true}
      isLoading={isLoading}
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
