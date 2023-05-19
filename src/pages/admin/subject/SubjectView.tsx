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
import { MdDescription, MdOutlineCode } from 'react-icons/md';
import { AiFillIdcard } from 'react-icons/ai';

const SubjectView = () => {
  const params = useParams();

  const [subject, setSubject] = useState({
    name: '',
    codeName: '',
    desc: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const getSubject = async () => {
    await apiHandler('get', `subjects/${params.subjectId}`, null).then(
      (res) => {
        if (res.success) {
          setSubject({
            name: res.data.name,
            codeName: res.data.codeName,
            desc: res.data.desc,
          });
          setIsLoading(false);
        } else {
          showMessage(res.message, 'failure');
        }
      }
    );
  };

  useEffect(() => {
    getSubject();
  }, []);

  return (
    <ViewLayout
      layoutTitle='View Subject'
      layoutSubtitle='Subject details'
      isLoading={isLoading}
    >
      <Card title='Name' subtitle={subject.name} Icon={AiFillIdcard} />
      <Card
        title='Code Name'
        subtitle={subject.codeName}
        Icon={MdOutlineCode}
      />
      <div className='lg:col-span-2'>
        <Card
          title='Description'
          subtitle={subject.desc}
          Icon={MdDescription}
        />
      </div>
    </ViewLayout>
  );
};

export default SubjectView;
