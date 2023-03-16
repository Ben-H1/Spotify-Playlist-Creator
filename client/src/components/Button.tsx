import clsx from 'clsx';
import { MouseEventHandler } from 'react';

type ButtonProps = {
    value: string;
    className?: string;
    onClick?: MouseEventHandler,
    variant?: 'primary' | 'secondary';
};

const Button = ({ value, className, onClick, variant }: ButtonProps) => {
    const commonClasses = clsx(
        'py-2 px-4 rounded-full my-2 font-bold',
        'hover:scale-103',
        'active:scale-100'
    );

    let uniqueClasses;

    switch (variant) {
        case 'secondary': {
            uniqueClasses = clsx(
                'text-white outline outline-1',
                'hover:outline-2',
                'active:text-ui-grayscale-600 active:outline-ui-grayscale-500 active:outline-1'
            );
            break;
        }
        default: {
            uniqueClasses = clsx(
                'bg-ui-green text-black',
                'hover:bg-ui-green-light',
                'active:bg-ui-green-dark'
            );
            break;
        }
    }

    return (
        <button
            className={clsx(commonClasses, uniqueClasses, className)}
            onClick={onClick}
        >
            {value}
        </button>
    );
};

export default Button;
