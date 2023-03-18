import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ClickAwayListener } from '@mui/base';
import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../App';
import { getMe } from '../SpotifyWrapper';
import BlankPic from './BlankProfilePic';
import LoadingSpinner from './LoadingSpinner';

type UserInfoProps = {
    handleLogout: () => void;
};

const UserInfo = ({ handleLogout }: UserInfoProps) => {
    const { token } = useContext(ApiContext);
    const [info, setInfo] = useState<any>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    useEffect(() => {
        getMe(token).then(r => setInfo(r));
    }, []);

    return (
        <>
            {dropdownOpen && <ClickAwayListener onClickAway={() => setDropdownOpen(false)}>
                <div className='bg-ui-grayscale-400 rounded-lg w-64 shadow-lg shadow-neutral-900 absolute right-4 top-16 p-2 select-none'>
                    <div
                        className='cursor-pointer hover:bg-ui-grayscale-500 p-3'
                        onClick={handleLogout}
                    >
                        Log out
                    </div>
                </div>
            </ClickAwayListener>}
            <div
                className='bg-black h-10 w-fit rounded-full p-1 flex top-4 right-4 absolute hover:bg-ui-grayscale-400 cursor-pointer select-none'
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                {info && <>
                    {info.images[0] ? <img className='h-full rounded-full' src={info.images[0].url}></img> : <BlankPic />}
                    <div className='grow flex items-center justify-center mx-3'>
                        <div className='font-bold'>{info.display_name}</div>
                    </div>
                </>}
                {!info && <>
                    <div className='h-full aspect-square flex items-center justify-center'>
                        <LoadingSpinner className='h-5' />
                    </div>
                </>}
                <div className='grow flex items-center justify-center mr-3'>
                    <FontAwesomeIcon className='h-5' icon={dropdownOpen ? faCaretUp : faCaretDown} />
                </div>
            </div>
        </>
    );
};

export default UserInfo;
