import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//layouts
import FormLayout from '../../../layouts/crud_layouts/FormLayout';

// components
import InputField from '../../../components/global/form/InputField';
import SelectField from '../../../components/global/form/SelectField';

// helpers
import { apiHandler } from '../../../handlers/apiHandler';
import { showMessage } from '../../../handlers/messageHandler';

// types
import { batchSchema, facultySchema, userSchema } from '../../../utils/schemas';

const UserEdit = () => {
  const params = useParams();

  const [user, setUser] = useState<userSchema>();
  const [faculties, setFaculties] = useState<facultySchema[]>([]);
  const [batches, setBatches] = useState<batchSchema[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const getUsers = async () => {
    await apiHandler('get', `users/${params.userId}`, null).then((res) => {
      if (res.success) {
        setUser(res.data);
        setIsLoading(false);
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
      setIsLoading(false);
    });
  };

  const getBatches = async () => {
    await apiHandler('get', 'batches', null).then((res) => {
      if (res.success) {
        setBatches(res.data);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getUsers();
    getFaculties();
    getBatches();
  }, []);

  return (
    <FormLayout
      layoutTitle='Edit Subject'
      layoutSubtitle='Fill out the forms'
      handleSubmit={handleEditUser}
      isEdit={true}
      isLoading={isLoading}
    >
      <InputField
        hasLabel
        label='Name'
        name='name'
        value={user?.name}
        isDisabled
      />
      <InputField
        hasLabel
        label='Email'
        name='email'
        value={user?.email}
        isDisabled
      />
      <SelectField
        hasLabel
        label='Role'
        name='role'
        value={user?.role}
        handleSelect={handleInputField}
        options={[
          {
            title: 'Student',
            value: 'student',
          },
          {
            title: 'Teacher',
            value: 'teacher',
          },
          {
            title: 'Admin',
            value: 'admin',
          },
          {
            title: 'User',
            value: 'user',
          },
        ]}
      />
      <InputField
        hasLabel
        label='College'
        name='college'
        value={user?.college}
        handleChange={handleInputField}
      />
      <SelectField
        hasLabel
        label='Batch'
        name='batch'
        value={user?.batch}
        handleSelect={handleInputField}
        options={batches.map((batch: batchSchema) => {
          return {
            title: `${batch.faculty} ${batch.year}`,
            value: batch._id,
          };
        })}
      />
    </FormLayout>
  );
};

export default UserEdit;
