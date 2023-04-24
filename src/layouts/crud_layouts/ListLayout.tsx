import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// components
import CustomButton from '../../components/global/CustomButton'

type propsType = {
    children: React.ReactNode,
    tableHeader: string[],
    layoutTitle: string,
    layoutSubtitle: string,
}

const ListLayout = ({ children, tableHeader, layoutTitle, layoutSubtitle }: propsType) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleAddSubject = () => {
        navigate(`${location.pathname}/create`);
    }

    return (
        <div className='shadow-custom rounded-lg bg-lightColor dark:bg-gray-800 px-6 py-6'>
            <div className='flex justify-between items-center'>
                <div>
                    <p className='text-darkColor dark:text-lightColor text-lg font-semibold'>{layoutTitle}</p>
                    <p className='text-gray-400 dark:text-gray-400 text-xs font-normal'>{layoutSubtitle}</p>
                </div>
                <CustomButton handleClick={handleAddSubject}>Create</CustomButton>
            </div>
            <div className='mt-4 relative block overflow-x-auto whitespace-nowrap'>
                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                            <th scope='col' className='px-6 py-3 rounded-l-lg'>S.N.</th>
                            {
                                tableHeader.map((header, headerIndex) => {
                                    return <th key={headerIndex + 1} scope='col' className='px-6 py-3'>{header}</th>
                                })
                            }
                            <th scope="col" className="px-6 py-3 rounded-r-lg">Action</th>
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