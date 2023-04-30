import { useEffect, useState } from 'react';
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

// components
import Modal from '../../../components/global/Modal';

const Subject = () => {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState<subjectSchema[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<subjectSchema | null>(
    null
  );

  const getSubjects = async () => {
    await apiHandler('get', 'subjects', null).then((res) => {
      if (res.success) {
        setSubjects(res.data);
      }
      setIsLoading(false);
    });
  };

  const changeSubjectStatus = () => {
    if (selectedSubject) {
      apiHandler('patch', `subjects/status/${selectedSubject._id}`).then(
        (res) => {
          if (res.success) {
            setIsModalOpen(false);
            window.location.reload();
          }
        }
      );
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        handleYes={changeSubjectStatus}
        onClose={() => setIsModalOpen(false)}
        title={
          selectedSubject?.isHidden
            ? 'Are you sure you want to restore this subject?'
            : 'Are you sure you want to archive this subject?'
        }
        colorScheme={selectedSubject?.isHidden ? 'warn' : 'failure'}
      />
      <ListLayout
        tableHeader={subjectHeader}
        layoutTitle='Subjects'
        layoutSubtitle={`${subjects.length} subjects added`}
        isEmpty={subjects.length === 0}
        isLoading={isLoading}
      >
        {subjects.map((subject: subjectSchema, subjectIndex) => {
          return (
            <tr key={subject._id} className='bg-lightColor dark:bg-gray-800'>
              <td className='px-6 py-4'>
                {subjectIndex + 1 < 10
                  ? `0${subjectIndex + 1}`
                  : subjectIndex + 1}
              </td>
              <td className='px-6 py-4 capitalize'>{subject.name}</td>
              <td className='px-6 py-4 uppercase'>{subject.codeName}</td>
              <ActionTd
                hasView
                hasEdit
                hasArchive
                isHidden={subject.isHidden}
                handleView={() =>
                  navigate(`/admin/subject/view/${subject._id}`)
                }
                handleEdit={() =>
                  navigate(`/admin/subject/edit/${subject._id}`)
                }
                handleArchive={() => {
                  setSelectedSubject(subject);
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

export default Subject;
