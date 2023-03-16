import { Children, cloneElement } from 'react';

type SingleAccordionProps = {
    children: any;
    className?: any;
    index: number;
    setIndex: (i: number) => void;
    allowClick?: boolean;
    variant: 'single';
};

type MultiAccordionProps = {
    children: any;
    className?: any;
    variant: 'multi';
};

type AccordionProps = SingleAccordionProps | MultiAccordionProps;

const Accordion = ({ children, className, index, setIndex, allowClick, variant }: AccordionProps) => {
    switch (variant) {
        case 'single': {
            const newChildren = Children.map(children, (child, i) => cloneElement(child, {
                variant: 'single',
                panelIndex: i,
                open: index === i,
                allowClick,
                handleClick: () => allowClick && setIndex(i)
            }));
        
            return (
                <div className={className}>
                    {newChildren}
                </div>
            );
        }
        default: {
            const newChildren = Children.map(children, (child) => cloneElement(child, {
                variant: 'multi',
                allowClick: true
            }));
        
            return (
                <div className={className}>
                    {newChildren}
                </div>
            );
        }
    }
};

export default Accordion;
