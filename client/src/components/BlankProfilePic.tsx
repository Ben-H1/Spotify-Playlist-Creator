import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

type BlankProfilePicProps = {
    className?: string;
    icon?: IconProp;
};

const BlankPic = ({ className, icon }: BlankProfilePicProps) => {
    return (
        <div className={clsx('h-full aspect-square rounded-full bg-no-pic flex items-center justify-center', className)}>
            <FontAwesomeIcon
                icon={icon ?? faUser}
            />
        </div>
    );
};

export default BlankPic;
