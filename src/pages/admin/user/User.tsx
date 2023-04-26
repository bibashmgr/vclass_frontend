import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// layouts
import ListLayout from '../../../layouts/crud_layouts/ListLayout';

// components
import ActionTd from '../../../components/admin/ActionTd';

// utils
import { userSchema } from '../../../utils/schemas';
import { userHeader } from '../../../utils/tableHeaders';

// handlers
import { apiHandler } from '../../../handlers/apiHandler';

const User = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getUsers = async () => {
        await apiHandler('get', 'users', null).then((res) => {
            if (res.success) {
                setUsers(res.data);
            }
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <ListLayout tableHeader={userHeader} layoutTitle='Users' layoutSubtitle={`${users.length} users added`} isEmpty={users.length === 0} isLoading={isLoading} hasCreateBtn={false}>
            {
                users.map((user: userSchema, userIndex) => {
                    return (
                        <tr key={user._id} className="bg-lightColor dark:bg-gray-800">
                            <td className='px-6 py-4'>{userIndex + 1 < 10 ? `0${userIndex + 1}` : userIndex + 1}</td>
                            <td className='px-6 py-4 capitalize'>{user.name}</td>
                            <td className='px-6 py-4'>{user.email}</td>
                            <td className='px-6 py-4 capitalize'>{user.role}</td>
                            <ActionTd hasView hasEdit hasDelete handleView={() => navigate(`/admin/user/view/${user._id}`)} handleEdit={() => navigate(`/admin/user/edit/${user._id}`)} handleDelete={() => console.log('delete user')} />
                        </tr>
                    )
                })
            }
        </ListLayout>
    )
}

export default User