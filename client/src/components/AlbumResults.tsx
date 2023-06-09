import { faArrowUpRightFromSquare, faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MouseEvent } from 'react';
import BlankPic from './BlankPic';
import Divider from './Divider';

const AlbumResult = ({ album }: any) => {
    const handleOpen = (e: MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();
        window.open(album?.external_urls?.spotify);
    };

    return (
        <div className='p-2 flex items-center select-none'>
            {album.images[0] ? <img className='h-10 mr-2 aspect-square object-cover' src={album.images[0].url}></img> : <BlankPic icon={faMusic} className='!h-10 mr-2 rounded-none' />}
            <div className='grow flex flex-col truncate'>
                <div className='truncate' title={album?.name}>{album?.name}</div>
                <div className='text-xs brightness-75 truncate' title={album?.artists?.map((a: any) => a.name).join(', ')}>{album?.artists?.map((a: any) => a.name).join(', ')}</div>
            </div>
            <FontAwesomeIcon className='ml-2 cursor-pointer' icon={faArrowUpRightFromSquare} onClick={handleOpen} title='Open in Spotify' />
        </div>
    );
};

const AlbumResults = ({ searchResults }: any) => {
    return (
        <div>
            {searchResults.length === 0 && <>
                <div className='flex justify-center items-center'>
                    <div>No results</div>
                </div>
            </>}
            {searchResults.length > 0 && <>
                {searchResults.map((album: any) => {
                    return (
                        <AlbumResult album={album} key={album.id} />
                    );
                }).reduce((p: any, c: any) => {
                    return [p, <Divider key={null} />, c];
                })}
            </>}
        </div>
    );
};

export default AlbumResults;
