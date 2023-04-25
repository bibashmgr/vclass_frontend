import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// layouts
import ListLayout from '../../../layouts/crud_layouts/ListLayout';

// components
import ActionTd from '../../../components/admin/ActionTd';

// utils
import { batchSchema } from '../../../utils/schemas';
import { batchHeader } from '../../../utils/tableHeaders';

const Batch = () => {
    const navigate = useNavigate();

    const [batches, setBatches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, [])

    return (
        <ListLayout tableHeader={batchHeader} layoutTitle='Batches' layoutSubtitle={`${batches.length} batches added`} isEmpty={batches.length === 0} isLoading={isLoading}>
            {
                batches.map((batch: batchSchema, batchIndex) => {
                    return (
                        <tr key={batch._id} className="bg-lightColor dark:bg-gray-800">
                            <td className='px-6 py-4'>{batchIndex + 1 < 10 ? `0${batchIndex + 1}` : batchIndex + 1}</td>
                            <td className='px-6 py-4'>{batch.year}</td>
                            <td className='px-6 py-4'>{batch.facultyId}</td>
                            <td className='px-6 py-4'>{batch.semester}</td>
                            <ActionTd hasView hasEdit hasDelete handleView={() => navigate(`/admin/batch/view/${batch._id}`)} handleEdit={() => navigate(`/admin/batch/edit/${batch._id}`)} handleDelete={() => console.log('delete batch')} />
                        </tr>
                    )
                })
            }
        </ListLayout>
    )
}

export default Batch