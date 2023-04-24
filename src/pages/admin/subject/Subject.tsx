import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// layouts
import ListLayout from '../../../layouts/crud_layouts/ListLayout';

// components
import ActionTd from '../../../components/admin/ActionTd';

// utils
import { subjectSchema } from '../../../utils/schemas';
import { subjectHeader } from '../../../utils/tableHeaders';
import { apiHandler } from '../../../helpers/apiHandler';

const Subject = () => {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        apiHandler('get', 'subject').then((res) => {
            if (res.success) {
                setSubjects(res.data)
            }
        });
    }, [])

    return (
        <ListLayout tableHeader={subjectHeader} layoutTitle='Subjects' layoutSubtitle={`${subjects.length} subjects added`}>
            {
                subjects.length === 0 ? (
                    <tr className="bg-white dark:bg-gray-800">
                        <td colSpan={subjectHeader.length + 2} className='min-w-[400px]'>
                            <div className='w-full py-6 flex flex-col gap-4 justify-center items-center'>
                                <img src="/images/empty-content.svg" alt="No data" className='w-[150px] h-[150px]' />
                                <p className='text-gray-400 font-medium text-sm'>Couldn't find any data</p>
                            </div>
                        </td>
                    </tr>
                ) : (
                    subjects.map((subject: subjectSchema, subjectIndex) => {
                        return (
                            <tr key={subject._id} className="bg-lightColor dark:bg-gray-800">
                                <td className='px-6 py-4'>{subjectIndex + 1 < 10 ? `0${subjectIndex + 1}` : subjectIndex + 1}</td>
                                <td className='px-6 py-4'>{subject.name}</td>
                                <td className='px-6 py-4'>{subject.codeName}</td>
                                <ActionTd hasView hasEdit hasDelete handleView={() => navigate(`/admin/subject/view/${subject._id}`)} handleEdit={() => navigate(`/admin/subject/edit/${subject._id}`)} handleDelete={() => console.log('delete subject')} />
                            </tr>
                        )
                    }))
            }
        </ListLayout>
    )
}

export default Subject