import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// layouts
import ListLayout from '../../../layouts/crud_layouts/ListLayout';

// components
import ActionTd from '../../../components/admin/ActionTd';
import Modal from '../../../components/global/Modal';

// utils
import { batchSchema } from '../../../utils/schemas';
import { batchHeader } from '../../../utils/tableHeaders';

// handlers
import { apiHandler } from '../../../handlers/apiHandler';
import { showMessage } from '../../../handlers/messageHandler';
import { numberTrimmer } from '../../../utils/trimmer';

const Batch = () => {
  const navigate = useNavigate();

  const [batches, setBatches] = useState<batchSchema[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [updateCounter, setUpdateCounter] = useState<boolean>(false);
  const [selectedBatch, setSelectedBatch] = useState<batchSchema | null>(null);

  const getBatches = async () => {
    await apiHandler('get', 'batches', null).then((res) => {
      if (res.success) {
        setBatches(res.data);
        setIsLoading(false);
      } else {
        showMessage(res.message, 'failure');
      }
    });
  };

  const changeBatchStatus = () => {
    if (selectedBatch) {
      apiHandler('patch', `batches/status/${selectedBatch._id}`).then((res) => {
        if (res.success) {
          setIsModalOpen(false);
          showMessage(res.message, 'success');
          setIsLoading(true);
          setUpdateCounter(!updateCounter);
        } else {
          showMessage(res.message, 'failure');
        }
      });
    }
  };

  useEffect(() => {
    getBatches();
  }, [updateCounter]);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        handleYes={changeBatchStatus}
        onClose={() => setIsModalOpen(false)}
        title={
          selectedBatch?.isHidden
            ? 'Are you sure you want to restore this batch?'
            : 'Are you sure you want to archive this batch?'
        }
        colorScheme={selectedBatch?.isHidden ? 'warn' : 'failure'}
      />
      <ListLayout
        tableHeader={batchHeader}
        layoutTitle="Batches"
        layoutSubtitle={`${batches.length} batches added`}
        isEmpty={batches.length === 0}
        isLoading={isLoading}
      >
        {batches.map((batch: batchSchema, batchIndex) => {
          return (
            <tr key={batch._id} className="bg-white dark:bg-gray-800">
              <td className="px-6 py-4">{numberTrimmer(batchIndex + 1)}</td>
              <td className="px-6 py-4">{batch.year}</td>
              <td className="px-6 py-4">{batch.faculty.name}</td>
              <td className="px-6 py-4">
                {batch.currentSemester < 10
                  ? `0${batch.currentSemester}`
                  : batch.currentSemester}
              </td>
              <ActionTd
                hasView
                hasEdit
                hasArchive
                isHidden={batch.isHidden}
                handleView={() => navigate(`/admin/batch/view/${batch._id}`)}
                handleEdit={() => navigate(`/admin/batch/edit/${batch._id}`)}
                handleArchive={() => {
                  setSelectedBatch(batch);
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

export default Batch;
