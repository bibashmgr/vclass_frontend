import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// layouts
import ListLayout from '../../../layouts/crud_layouts/ListLayout';

// components
import ActionTd from '../../../components/admin/ActionTd';

// utils
import { userSchema } from '../../../utils/schemas';
import { userHeader } from '../../../utils/tableHeaders';

const User = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, [])

    return (
        <ListLayout tableHeader={userHeader} layoutTitle='Users' layoutSubtitle={`${users.length} users added`} isEmpty={users.length === 0} isLoading={isLoading}>
            {
                users.map((user: userSchema, userIndex) => {
                    return (
                        <tr key={user._id} className="bg-lightColor dark:bg-gray-800">
                            <td className='px-6 py-4'>{userIndex + 1 < 10 ? `0${userIndex + 1}` : userIndex + 1}</td>
                            <td className='px-6 py-4'>{user.name}</td>
                            <td className='px-6 py-4'>{user.email}</td>
                            <td className='px-6 py-4'>{user.role}</td>
                            <td className='px-6 py-4'>{user.batch}</td>
                            <td className='px-6 py-4'>{user.faculty}</td>
                            <ActionTd hasView hasEdit hasDelete handleView={() => navigate(`/admin/user/view/${user._id}`)} handleEdit={() => navigate(`/admin/user/edit/${user._id}`)} handleDelete={() => console.log('delete user')} />
                        </tr>
                    )
                })
            }
        </ListLayout>
    )
}

export default User