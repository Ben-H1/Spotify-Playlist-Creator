import clsx from 'clsx';

const Divider = ({ className }: any) => {
    return (
        <div className={clsx('w-full block bg-white h-px my-2', className)}></div>
    );
};

export default Divider;
