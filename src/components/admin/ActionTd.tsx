import React from 'react'

// components
import CustomButton from '../global/CustomButton'

type propsType = {
    hasView?: boolean,
    hasEdit?: boolean,
    hasDelete?: boolean,
    handleView?: () => void,
    handleEdit?: () => void,
    handleDelete?: () => void,
}

const ActionTd = ({ hasView = true, hasEdit = false, hasDelete = false, handleView = () => { }, handleEdit = () => { }, handleDelete = () => { } }: propsType) => {
    return (
        <td className='px-6 py-4 flex gap-2 justify-start items-center'>
            {
                hasView && <CustomButton handleClick={handleView} colorScheme='success'>
                    View
                </CustomButton>
            }
            {
                hasEdit && <CustomButton handleClick={handleEdit} colorScheme='info'>
                    Edit
                </CustomButton>
            }
            {
                hasDelete && <CustomButton handleClick={handleDelete} colorScheme='failure'>
                    Delete
                </CustomButton>
            }
        </td>
    )
}

export default ActionTd