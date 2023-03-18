import clsx from 'clsx';
import { ReactNode, useState } from 'react';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSpring, animated } from '@react-spring/web';
import useMeasure from 'react-use-measure';

type SingleAccordionItemProps = {
    title: string;
    children?: any;
    className?: string;
    titleClassName?: string;
    open: boolean;
    panelIndex: number;
    handleClick: () => void;
    allowClick: boolean;
    variant?: 'single';
};

type MultiAccordionItemProps = {
    title: string;
    children?: any;
    className?: string;
    titleClassName?: string;
    open?: boolean;
    variant?: 'multi';
};

type AccordionItemProps = SingleAccordionItemProps | MultiAccordionItemProps;

const AccordionItem = ({ title, children, className, titleClassName, open, handleClick, variant, allowClick }: AccordionItemProps) => {
    const [isOpen, setIsOpen] = useState(open ?? false);

    const [ref, { height, width }] = useMeasure();

    let props;
    if (variant === 'single') {
        props = useSpring({ height: open ? height : 0 });
    } else {
        props = useSpring({ height: isOpen ? height : 0 });
    }

    return (
        <div className={clsx('relative', className, allowClick && 'cursor-pointer')}>
            <div
                className={clsx('select-none flex justify-between items-center', titleClassName)}
                onClick={() => {
                    switch (variant) {
                        case 'single': {
                            handleClick();
                            break;
                        }
                        default: {
                            setIsOpen(!isOpen);
                            break;
                        }
                    }
                }}
            >
                <div>{title}</div>
                {(variant === 'multi' && allowClick) && <FontAwesomeIcon className='ml-4' icon={isOpen ? faMinus : faPlus} />}
                {(variant === 'single' && allowClick) && <FontAwesomeIcon className={clsx('ml-4', open && 'invisible')} icon={faPlus} />}
            </div>
            <div className='overflow-hidden'>
                <animated.div style={props}>
                    <div
                        className='py-2'
                        ref={ref}
                    >
                        {children}
                    </div>
                </animated.div>
            </div>
        </div>
    );
};

export default AccordionItem;
