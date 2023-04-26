import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// layouts
import ListLayout from '../../../layouts/crud_layouts/ListLayout';

// components
import ActionTd from '../../../components/admin/ActionTd';

// utils
import { facultySchema } from '../../../utils/schemas';
import { facultyHeader } from '../../../utils/tableHeaders';
import { apiHandler } from '../../../handlers/apiHandler';

const Faculty = () => {
    const navigate = useNavigate();

    const [faculties, setFaculties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getFaculties = async () => {
        await apiHandler('get', 'faculties', null).then((res) => {
            if (res.success) {
                setFaculties(res.data);
            }
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getFaculties();
    }, [])

    return (
        <ListLayout tableHeader={facultyHeader} layoutTitle='Faculties' layoutSubtitle={`${faculties.length} faculties added`} isEmpty={faculties.length === 0} isLoading={isLoading}>
            {
                faculties.map((faculty: facultySchema, facultyIndex) => {
                    return (
                        <tr key={faculty._id} className="bg-lightColor dark:bg-gray-800">
                            <td className='px-6 py-4'>{facultyIndex + 1 < 10 ? `0${facultyIndex + 1}` : facultyIndex + 1}</td>
                            <td className='px-6 py-4 uppercase'>{faculty.name}</td>
                            <td className='px-6 py-4'>{faculty.semesters.length}</td>
                            <ActionTd hasView hasEdit hasArchive isHidden={faculty.isHidden} handleView={() => navigate(`/admin/faculty/view/${faculty._id}`)} handleEdit={() => navigate(`/admin/subject/edit/${faculty._id}`)} handleArchive={() => console.log('delete faculty')} />
                        </tr>
                    )
                })
            }
        </ListLayout>
    )
}

export default Faculty