import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// layouts
import ListLayout from '../../../layouts/crud_layouts/ListLayout';

// components
import ActionTd from '../../../components/admin/ActionTd';

// utils
import { subjectSchema } from '../../../utils/schemas';
import { subjectHeader } from '../../../utils/tableHeaders';

// handlers
import { apiHandler } from '../../../handlers/apiHandler';

const Subject = () => {
    const navigate = useNavigate();

    const [subjects, setSubjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getSubjects = async () => {
        await apiHandler('get', 'subjects', null).then((res) => {
            if (res.success) {
                setSubjects(res.data);
            }
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getSubjects();
    }, []);

    return (
        <ListLayout tableHeader={subjectHeader} layoutTitle='Subjects' layoutSubtitle={`${subjects.length} subjects added`} isEmpty={subjects.length === 0} isLoading={isLoading}>
            {
                subjects.map((subject: subjectSchema, subjectIndex) => {
                    return (
                        <tr key={subject._id} className="bg-lightColor dark:bg-gray-800">
                            <td className='px-6 py-4'>{subjectIndex + 1 < 10 ? `0${subjectIndex + 1}` : subjectIndex + 1}</td>
                            <td className='px-6 py-4 capitalize'>{subject.name}</td>
                            <td className='px-6 py-4 uppercase'>{subject.codeName}</td>
                            <ActionTd hasView hasEdit hasDelete handleView={() => navigate(`/admin/subject/view/${subject._id}`)} handleEdit={() => navigate(`/admin/subject/edit/${subject._id}`)} handleDelete={() => console.log('delete subject')} />
                        </tr>
                    )
                })
            }
        </ListLayout>
    )
}

export default Subject