import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// layouts
import ListLayout from '../../../../layouts/crud_layouts/ListLayout';

// utils
import { postStatsHeader } from '../../../../utils/tableHeaders';
import { postSingleStatsSchema } from '../../../../utils/schemas';

// handlers
import { apiHandler } from '../../../../handlers/apiHandler';

// components
import Badge from '../../../../components/global/Badge';
import { numberTrimmer } from '../../../../utils/trimmer';

const PostSingleStats = () => {
  const params = useParams();

  const [students, setStudents] = useState<postSingleStatsSchema[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getPostStats = async () => {
    const res = await apiHandler('get', `posts/${params.postId}/stats`, null);

    if (res.success) {
      setStudents(res.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPostStats();
  }, []);

  return (
    <div className='py-4'>
      <ListLayout
        tableHeader={postStatsHeader}
        layoutTitle='Students'
        layoutSubtitle={`${students.length} students joined`}
        isEmpty={students.length === 0}
        isLoading={isLoading}
        hasCreateBtn={false}
        hasBackBtn={true}
        hasAction={false}
      >
        {students.map((student: postSingleStatsSchema, studentIndex) => {
          return (
            <tr key={studentIndex} className='bg-white dark:bg-gray-800'>
              <td className='px-6 py-4'>{numberTrimmer(studentIndex + 1)}</td>
              <td className='px-6 py-4 capitalize'>{student?.name}</td>
              <td className='px-6 py-4'>{student?.email}</td>
              <td className='px-6 py-4'>
                <Badge title={student?.status} colorScheme={student?.status} />
              </td>
            </tr>
          );
        })}
      </ListLayout>
    </div>
  );
};

export default PostSingleStats;
