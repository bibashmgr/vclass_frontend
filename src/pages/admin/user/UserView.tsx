import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// handlers
import { apiHandler } from '../../../handlers/apiHandler';
import { showMessage } from '../../../handlers/messageHandler';

// layouts
import ViewLayout from '../../../layouts/crud_layouts/ViewLayout';

// components
import Card from '../../../components/global/Card';

// icons
import { FaUniversity } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { AiFillIdcard } from 'react-icons/ai';
import { BsStack, BsPersonFill } from 'react-icons/bs';

// type
import { userSchema, batchSchema } from '../../../utils/schemas';

const UserView = () => {
  const params = useParams();

  const [user, setUser] = useState<userSchema>();
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <ViewLayout
      layoutTitle='View User'
      layoutSubtitle='User details'
      isLoading={isLoading}
    >
      <Card title='Name' subtitle={user?.name} Icon={AiFillIdcard} />
      <Card title='Email' subtitle={user?.email} Icon={MdEmail} />
      <Card title='Role' subtitle={user?.role} Icon={BsPersonFill} />
      <Card title='College' subtitle={user?.college} Icon={FaUniversity} />
      <Card title='Batch' subtitle={user?.batch?.year} Icon={BsStack} />
    </ViewLayout>
  );
};

export default UserView;
