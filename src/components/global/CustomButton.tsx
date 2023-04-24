import React from 'react'

// components
import Spinner from './Spinner';

type propsType = {
    children: React.ReactNode,
    handleClick: React.MouseEventHandler,
    colorScheme?: string,
    isLoading?: boolean,
    isDisabled?: boolean,
}

const CustomButton = ({ children, handleClick, colorScheme = 'neutral', isLoading = false, isDisabled = false }: propsType) => {
    const getColorScheme = (color: string) => {
        if (color === 'neutral') return 'text-darkColor bg-neutralColor-lightest';
        if (color === 'success') return 'text-lightColor bg-successColor-dark';
        if (color === 'info') return 'text-lightColor bg-infoColor-dark';
        if (color === 'failure') return 'text-lightColor bg-failureColor-dark';
        return 'text-darkColor bg-neutralColor-lightest'
    }

    return (
        <button type='button' className={`px-4 py-2 rounded-md text-sm font-medium hover:opacity-75 h-auto ${getColorScheme(colorScheme)}`} onClick={handleClick} disabled={isDisabled}>
            {
                isLoading ? <div className='px-3'>
                    <Spinner />
                </div> : children
            }
        </button>
    )
}

export default CustomButton