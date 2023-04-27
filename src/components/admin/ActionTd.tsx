import React from 'react';

// components
import Button from '../global/Button';

type propsType = {
  hasView?: boolean;
  hasEdit?: boolean;
  hasArchive?: boolean;
  isHidden: boolean;
  handleView?: () => void;
  handleEdit?: () => void;
  handleArchive?: () => void;
};

const ActionTd = ({
  hasView = true,
  hasEdit = false,
  hasArchive = false,
  isHidden,
  handleView = () => {},
  handleEdit = () => {},
  handleArchive = () => {},
}: propsType) => {
  return (
    <td className='px-6 py-4 flex gap-2 justify-start items-center'>
      {hasView && (
        <Button handleClick={handleView} colorScheme='success'>
          View
        </Button>
      )}
      {hasEdit && (
        <Button handleClick={handleEdit} colorScheme='info'>
          Edit
        </Button>
      )}
      {hasArchive && isHidden ? (
        <Button handleClick={handleArchive} colorScheme='warn'>
          Restore
        </Button>
      ) : (
        <Button handleClick={handleArchive} colorScheme='failure'>
          Archive
        </Button>
      )}
    </td>
  );
};

export default ActionTd;
