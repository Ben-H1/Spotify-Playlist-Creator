import clsx from 'clsx';
import { MouseEventHandler, ReactNode } from 'react';

type AnimatedUnderlineProps = {
    className?: string;
    onClick?: MouseEventHandler,
    children?: ReactNode;
};

const AnimatedUnderline = ({ className, onClick, children }: AnimatedUnderlineProps) => {
    return (
        <span
            className={clsx(
                'border-b-0',
                '[background-image:linear-gradient(transparent,_transparent),_linear-gradient(#fff,_#fff)] [background-size:0_1px] [background-position:0_100%] bg-no-repeat',
                '[transition:background-size_.25s_ease-in-out] hover:[background-size:100%_1px] hover:[background-position:0_100%]',
                onClick && 'cursor-pointer',
                className
            )}
            onClick={onClick}
        >
            {children}
        </span>
    );
};

export default AnimatedUnderline;
