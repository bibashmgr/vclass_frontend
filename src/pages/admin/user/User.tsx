import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// layouts
import ListLayout from '../../../layouts/crud_layouts/ListLayout';

// components
import ActionTd from '../../../components/admin/ActionTd';
import Modal from '../../../components/global/Modal';

// utils
import { userSchema } from '../../../utils/schemas';
import { userHeader } from '../../../utils/tableHeaders';

// handlers
import { apiHandler } from '../../../handlers/apiHandler';
import { showMessage } from '../../../handlers/messageHandler';

const User = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [updateCounter, setUpdateCounter] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<userSchema | null>(null);

  const getUsers = async () => {
    await apiHandler('get', 'users', null).then((res) => {
      if (res.success) {
        setUsers(res.data);
        setIsLoading(false);
      } else {
        showMessage(res.message, 'failure');
      }
    });
  };

  const changeUserStatus = () => {
    if (selectedUser) {
      apiHandler('patch', `users/status/${selectedUser._id}`).then((res) => {
        if (res.success) {
          setIsModalOpen(false);
          showMessage(res.message, 'success');
          setIsLoading(true);
          setUpdateCounter(!updateCounter);
        } else {
          setIsModalOpen(false);
          showMessage(res.message, 'failure');
        }
      });
    }
  };

  useEffect(() => {
    getUsers();
  }, [updateCounter]);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        handleYes={changeUserStatus}
        onClose={() => setIsModalOpen(false)}
        title={
          selectedUser?.isHidden
            ? 'Are you sure you want to restore this user?'
            : 'Are you sure you want to archive this user?'
        }
        colorScheme={selectedUser?.isHidden ? 'warn' : 'failure'}
      />
      <ListLayout
        tableHeader={userHeader}
        layoutTitle='Users'
        layoutSubtitle={`${users.length} users added`}
        isEmpty={users.length === 0}
        isLoading={isLoading}
        hasCreateBtn={false}
      >
        {users.map((user: userSchema, userIndex) => {
          return (
            <tr key={user._id} className='bg-lightColor dark:bg-gray-800'>
              <td className='px-6 py-4'>
                {userIndex + 1 < 10 ? `0${userIndex + 1}` : userIndex + 1}
              </td>
              <td className='px-6 py-4 capitalize'>{user.name}</td>
              <td className='px-6 py-4'>{user.email}</td>
              <td className='px-6 py-4 capitalize'>{user.role}</td>
              <ActionTd
                hasView
                hasEdit
                hasArchive
                isHidden={user.isHidden}
                handleView={() => navigate(`/admin/user/view/${user._id}`)}
                handleEdit={() => navigate(`/admin/user/edit/${user._id}`)}
                handleArchive={() => {
                  setSelectedUser(user);
                  setIsModalOpen(true);
                }}
              />
            </tr>
          );
        })}
      </ListLayout>
    </>
  );
};

export default User;
