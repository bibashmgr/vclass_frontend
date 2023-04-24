import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// components
import CustomButton from '../../components/global/CustomButton'

type propsType = {
    children: React.ReactNode,
    tableHeader: string[],
}

const ListLayout = ({ children, tableHeader }: propsType) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleAddSubject = () => {
        navigate(`${location.pathname}/create`);
    }

    return (
        <div className='shadow-custom rounded-md bg-lightColor px-6 py-6'>
            <div className='flex justify-between items-center'>
                <div>
                    <p className='text-darkColor text-lg font-semibold'>Subject</p>
                    <p className='text-neutralColor-light text-xs font-normal'>5 subjects added</p>
                </div>
                <CustomButton handleClick={handleAddSubject}>Create</CustomButton>
            </div>
            <div className='mt-4 block overflow-x-auto whitespace-nowrap'>
                <table>
                    <thead>
                        <tr>
                            <th className='rounded-tl-md rounded-bl-md pl-6'>S.N.</th>
                            {
                                tableHeader.map((header, headerIndex) => {
                                    return <th key={headerIndex + 1}>{header}</th>
                                })
                            }
                            <th className='rounded-tr-md rounded-br-md pr-6'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListLayout