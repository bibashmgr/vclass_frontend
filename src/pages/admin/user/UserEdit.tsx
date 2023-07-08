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
import { batchSchema } from '../../../utils/schemas';

const UserEdit = () => {
  const params = useParams();

  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    college: '',
    batch: '',
  });
  const [batches, setBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [roleOptions] = useState([
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
  ]);

  const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();

    apiHandler('patch', `users/${params.userId}`, user).then((res) => {
      if (res.success) {
        setUser(res.data);
        showMessage(res.message, 'success');
      } else {
        showMessage(res.message, 'failure');
      }
    });
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

  const getBatches = async () => {
    await apiHandler('get', 'batches', null).then((res) => {
      if (res.success) {
        let mappingBatches = res.data.map((data: batchSchema) => {
          return {
            title: data.year,
            value: data._id,
          };
        });

        setBatches(mappingBatches);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getBatches();
    getUsers();
  }, []);

  return (
    <FormLayout
      layoutTitle='Edit User'
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
        options={roleOptions}
      />
      <InputField
        hasLabel
        label='College'
        name='college'
        value={user?.college}
        isRequired={false}
        handleChange={handleInputField}
      />
      <SelectField
        hasLabel
        label='Batch'
        name='batch'
        value={user?.batch}
        handleSelect={handleInputField}
        options={batches}
        isRequired={false}
      />
    </FormLayout>
  );
};

export default UserEdit;
