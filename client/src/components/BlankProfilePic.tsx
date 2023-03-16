import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BlankProfilePic = () => {
    return (
        <div className='h-full aspect-square rounded-full bg-no-pic flex items-center justify-center'>
            <FontAwesomeIcon
                icon={faUser}
            />
        </div>
    );
};

export default BlankProfilePic;
