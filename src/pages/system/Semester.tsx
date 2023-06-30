import { useState, useEffect } from 'react';
import { useOutletContext, useParams, useNavigate } from 'react-router-dom';

// schemas
import { subjectSchema } from '../../utils/schemas';

// components
import IconButton from '../../components/global/button/IconButton';

// icons
import { BsArrowRightShort } from 'react-icons/bs';

const Semester = () => {
  const params = useParams();
  const navigate = useNavigate();
  const outletContext: any = useOutletContext();

  const [subjects, setSubjects] = useState<subjectSchema[]>([]);

  useEffect(() => {
    let subs = outletContext.faculty?.semesters[Number(params.semesterId) - 1];
    setSubjects(subs);
  }, [outletContext]);

  return (
    <div className='grid grid-cols-2 lg:grid-cols-3 gap-6'>
      {subjects?.map((subject, index) => {
        return !subject.isHidden ? (
          <div
            key={index}
            className='flex flex-col gap-4 px-4 py-4 shadow-light dark:shadow-none rounded-lg bg-lightColor dark:bg-gray-800'
          >
            <p className='text-gray-400 dark:text-gray-400 text-xs font-bold'>
              {subject?.codeName}
            </p>
            <p className='text-darkColor dark:text-lightColor text-lg font-semibold'>
              {subject?.name}
            </p>
            <p className='text-gray-400 dark:text-gray-400 text-xs font-normal'>
              {subject?.desc}
            </p>
            <div className='self-end'>
              <IconButton
                Icon={BsArrowRightShort}
                title='View'
                iconSize={'6'}
                handleClick={() => navigate(`subject/${subject._id}/chat`)}
              />
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default Semester;
