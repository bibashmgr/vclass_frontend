import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// layouts
import ListLayout from '../../../layouts/crud_layouts/ListLayout';

// components
import ActionTd from '../../../components/admin/ActionTd';

// utils
import { batchSchema } from '../../../utils/schemas';
import { batchHeader } from '../../../utils/tableHeaders';

// handlers
import { apiHandler } from '../../../handlers/apiHandler';

const Batch = () => {
    const navigate = useNavigate();

    const [batches, setBatches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getBatches = async () => {
        await apiHandler('get', 'batches', null).then((res) => {
            if (res.success) {
                setBatches(res.data);
            }
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getBatches();
    }, [])

    return (
        <ListLayout tableHeader={batchHeader} layoutTitle='Batches' layoutSubtitle={`${batches.length} batches added`} isEmpty={batches.length === 0} isLoading={isLoading}>
            {
                batches.map((batch: batchSchema, batchIndex) => {
                    return (
                        <tr key={batch._id} className="bg-lightColor dark:bg-gray-800">
                            <td className='px-6 py-4'>{batchIndex + 1 < 10 ? `0${batchIndex + 1}` : batchIndex + 1}</td>
                            <td className='px-6 py-4'>{batch.year}</td>
                            <td className='px-6 py-4'>{batch.faculty.name}</td>
                            <td className='px-6 py-4'>{batch.currentSemester + 1 < 10 ? `0${batch.currentSemester + 1}` : batch.currentSemester + 1}</td>
                            <ActionTd hasView hasEdit hasArchive isHidden={batch.isHidden} handleView={() => navigate(`/admin/batch/view/${batch._id}`)} handleEdit={() => navigate(`/admin/batch/edit/${batch._id}`)} handleArchive={() => console.log('archive batch')} />
                        </tr>
                    )
                })
            }
        </ListLayout>
    )
}

export default Batch