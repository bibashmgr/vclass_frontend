import React from 'react'

// components
import CustomButton from '../global/CustomButton'

type propsType = {
    hasView?: boolean,
    hasEdit?: boolean,
    hasArchive?: boolean,
    isHidden: boolean,
    handleView?: () => void,
    handleEdit?: () => void,
    handleArchive?: () => void,
}

const ActionTd = ({ hasView = true, hasEdit = false, hasArchive = false, isHidden, handleView = () => { }, handleEdit = () => { }, handleArchive = () => { } }: propsType) => {
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
                hasArchive && isHidden ?
                    (<CustomButton handleClick={handleArchive} colorScheme='warn'>
                        Restore
                    </CustomButton>) :
                    (<CustomButton handleClick={handleArchive} colorScheme='failure'>
                        Archive
                    </CustomButton>)
            }
        </td>
    )
}

export default ActionTd