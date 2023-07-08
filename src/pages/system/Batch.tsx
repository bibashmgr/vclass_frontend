import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// schemas
import { portalSchema } from '../../utils/schemas';

// handlers
import { apiHandler } from '../../handlers/apiHandler';
import IconButton from '../../components/global/button/IconButton';
import { BsArrowRightShort } from 'react-icons/bs';

const Batch = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [portals, setPortals] = useState<portalSchema[]>([]);

  const fetchPortals = async () => {
    const res = await apiHandler('get', `portals/${params.batchId}`);

    if (res.success) {
      setPortals(res.data);
    }
  };

  useEffect(() => {
    fetchPortals();
  }, []);

  return (
    <div className='grid grid-cols-2 lg:grid-cols-3 gap-6'>
      {portals?.map((portal: portalSchema, index: number) => {
        return !portal?.subject?.isHidden ? (
          <div
            key={index}
            className='flex flex-col gap-4 px-4 py-4 shadow-light dark:shadow-none rounded-lg bg-lightColor dark:bg-gray-800'
          >
            <p className='text-gray-400 dark:text-gray-400 text-xs font-bold'>
              {portal?.subject?.codeName}
            </p>
            <p className='text-darkColor dark:text-lightColor text-lg font-semibold'>
              {portal?.subject?.name}
            </p>
            <p className='text-gray-400 dark:text-gray-400 text-xs font-normal'>
              {portal?.subject?.desc}
            </p>
            <div className='self-end'>
              <IconButton
                Icon={BsArrowRightShort}
                title='View'
                iconSize={'6'}
                handleClick={() =>
                  navigate(`subject/${portal?.subject?._id}/chat`)
                }
              />
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default Batch;
