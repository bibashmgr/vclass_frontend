import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// helpers
import { apiHandler } from '../../../handlers/apiHandler';

// layouts
import ViewLayout from '../../../layouts/crud_layouts/ViewLayout';

// components
import Card from '../../../components/global/Card';

// icons
import { MdOutlineCode } from 'react-icons/md';
import { AiFillIdcard } from 'react-icons/ai';

const SubjectView = () => {
  const params = useParams();
  const [subject, setSubject] = useState({
    name: '',
    codeName: '',
  });

  useEffect(() => {
    apiHandler('get', `subjects/${params.id}`, null).then((res) => {
      if (res.success) {
        setSubject({
          name: res.data.name,
          codeName: res.data.codeName,
        });
      }
    });
  }, []);

  return (
    <ViewLayout layoutTitle='View Subject' layoutSubtitle='Subject details'>
      <Card title='Name' subtitle={subject.name} Icon={AiFillIdcard} />
      <Card
        title='Code Name'
        subtitle={subject.codeName}
        Icon={MdOutlineCode}
      />
    </ViewLayout>
  );
};

export default SubjectView;
