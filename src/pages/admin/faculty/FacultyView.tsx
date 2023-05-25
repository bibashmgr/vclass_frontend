import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// helpers
import { apiHandler } from '../../../handlers/apiHandler';
import { showMessage } from '../../../handlers/messageHandler';

// layouts
import ViewLayout from '../../../layouts/crud_layouts/ViewLayout';

// components
import Card from '../../../components/global/Card';

// icons
import { MdDescription } from 'react-icons/md';
import { AiFillIdcard } from 'react-icons/ai';
import { IoPeople } from 'react-icons/io5';

const FacultyView = () => {
  const params = useParams();

  const [faculty, setFaculty] = useState({
    name: '',
    semesters: [],
    desc: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const getFaculty = async () => {
    await apiHandler('get', `faculties/${params.facultyId}`, null).then(
      (res) => {
        if (res.success) {
          setFaculty(res.data);
          setIsLoading(false);
        } else {
          showMessage(res.message, 'failure');
        }
      }
    );
  };

  useEffect(() => {
    getFaculty();
  }, []);

  return (
    <ViewLayout
      layoutTitle='View Faculty'
      layoutSubtitle='Faculty details'
      isLoading={isLoading}
    >
      <Card title='Name' subtitle={faculty.name} Icon={AiFillIdcard} />
      <Card
        title='Toatal Semesters'
        subtitle={
          faculty.semesters.length < 10
            ? `0${faculty.semesters.length}`
            : faculty.semesters.length
        }
        Icon={IoPeople}
      />
      <div className='lg:col-span-2'>
        <Card
          title='Description'
          subtitle={faculty.desc}
          Icon={MdDescription}
        />
      </div>
    </ViewLayout>
  );
};

export default FacultyView;
