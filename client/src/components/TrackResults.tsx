import { faArrowUpRightFromSquare, faExclamationCircle, faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MouseEvent } from 'react';
import BlankPic from './BlankPic';
import Divider from './Divider';

const TrackResult = ({ track }: any) => {
    const handleOpen = (e: MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();
        window.open(track?.external_urls?.spotify);
    };

    return (
        <div className='flex items-center select-none'>
            {track?.album?.images[0] ? <img className='h-8 mr-2 aspect-square object-cover' src={track.album.images[0].url}></img> : <BlankPic icon={faMusic} className='!h-8 mr-2 rounded-none' />}
            <div className='grow flex flex-col truncate'>
                <div className='truncate flex items-center'>
                    <div className='truncate' title={track?.name}>{track?.name}</div>
                    {track?.explicit && <div className='ml-3 border text-xs px-1 h-fit brightness-75' title='Explicit'>EXPLICIT</div>}
                </div>
                <div className='flex items-center truncate'>
                    <div className='text-xs brightness-75 truncate' title={track?.artists?.map((a: any) => a.name).join(', ')}>{track?.artists?.map((a: any) => a.name).join(', ')}</div>
                </div>
            </div>
            <FontAwesomeIcon className='mx-2 cursor-pointer' icon={faArrowUpRightFromSquare} onClick={handleOpen} title='Open in Spotify' />
        </div>
    );
};

const TrackResults = ({ searchResults }: any) => {
    return (
        <div>
            {searchResults.length === 0 && <>
                <div className='flex justify-center items-center'>
                    <div>No results</div>
                </div>
            </>}
            {searchResults.length > 0 && <>
                {searchResults.map((track: any) => {
                    return (
                        <TrackResult track={track} key={track.id} />
                    );
                }).reduce((p: any, c: any) => {
                    return [p, <Divider className='my-1' key={null} />, c];
                })}
            </>}
        </div>
    );
};

export default TrackResults;
