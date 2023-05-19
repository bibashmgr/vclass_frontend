import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// layouts
import ListLayout from '../../../layouts/crud_layouts/ListLayout';

// components
import ActionTd from '../../../components/admin/ActionTd';
import Modal from '../../../components/global/Modal';

// utils
import { facultySchema } from '../../../utils/schemas';
import { facultyHeader } from '../../../utils/tableHeaders';

// handlers
import { apiHandler } from '../../../handlers/apiHandler';
import { showMessage } from '../../../handlers/messageHandler';

const Faculty = () => {
  const navigate = useNavigate();

  const [faculties, setFaculties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [updateCounter, setUpdateCounter] = useState<boolean>(false);
  const [selectedFaculty, setSelectedFaculty] = useState<facultySchema | null>(
    null
  );

  const getFaculties = async () => {
    await apiHandler('get', 'faculties', null).then((res) => {
      if (res.success) {
        setFaculties(res.data);
        setIsLoading(false);
      } else {
        showMessage(res.message, 'failure');
      }
    });
  };

  const changeFacultyStatus = () => {
    if (selectedFaculty) {
      apiHandler('patch', `faculties/status/${selectedFaculty._id}`).then(
        (res) => {
          if (res.success) {
            setIsModalOpen(false);
            showMessage(res.message, 'success');
            setUpdateCounter(!updateCounter);
          } else {
            showMessage(res.message, 'failure');
          }
        }
      );
    }
  };

  useEffect(() => {
    getFaculties();
  }, [updateCounter]);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        handleYes={changeFacultyStatus}
        onClose={() => setIsModalOpen(false)}
        title={
          selectedFaculty?.isHidden
            ? 'Are you sure you want to restore this faculty?'
            : 'Are you sure you want to archive this faculty?'
        }
        colorScheme={selectedFaculty?.isHidden ? 'warn' : 'failure'}
      />
      <ListLayout
        tableHeader={facultyHeader}
        layoutTitle='Faculties'
        layoutSubtitle={`${faculties.length} faculties added`}
        isEmpty={faculties.length === 0}
        isLoading={isLoading}
      >
        {faculties.map((faculty: facultySchema, facultyIndex) => {
          return (
            <tr key={faculty._id} className='bg-lightColor dark:bg-gray-800'>
              <td className='px-6 py-4'>
                {facultyIndex + 1 < 10
                  ? `0${facultyIndex + 1}`
                  : facultyIndex + 1}
              </td>
              <td className='px-6 py-4 uppercase'>{faculty.name}</td>
              <td className='px-6 py-4'>
                {faculty.semesters.length < 10
                  ? `0${faculty.semesters.length}`
                  : faculty.semesters.length}
              </td>
              <ActionTd
                hasView
                hasEdit
                hasArchive
                isHidden={faculty.isHidden}
                handleView={() =>
                  navigate(`/admin/faculty/view/${faculty._id}`)
                }
                handleEdit={() =>
                  navigate(`/admin/faculty/edit/${faculty._id}`)
                }
                handleArchive={() => {
                  setSelectedFaculty(faculty);
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

export default Faculty;
