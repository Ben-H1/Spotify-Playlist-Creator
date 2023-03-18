import { faArrowUpRightFromSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MouseEvent, useContext, useEffect, useState } from 'react';
import BlankPic from './BlankPic';
import { ConfigContext } from './ConfigContextProvider';
import Divider from './Divider';

const ArtistSearchResult = ({ artist }: any) => {
    const { artists, setArtists } = useContext(ConfigContext);
    const [checked, setChecked] = useState<boolean>(Object.keys(artists).includes(artist.id));

    useEffect(() => setChecked(Object.keys(artists).includes(artist.id)), [artists]);

    const handleCheck = () => {
        const nextState = !checked;
        setChecked(nextState);
        
        if (nextState) {
            setArtists((a: any) => ({ ...a, [artist.id]: artist }));
        } else {
            const currentArtists = { ...artists };
            delete currentArtists[artist.id];
            setArtists(currentArtists);
        }
    };

    const handleOpen = (e: MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();
        window.open(artist?.external_urls?.spotify);
    };

    return (
        <div className='p-2 hover:bg-ui-grayscale-500 flex items-center select-none' onClick={handleCheck}>
            {checked && <FontAwesomeIcon className='mr-2' icon={faCheck} />}
            {artist.images[0] ? <img className='h-10 rounded-full mr-2 aspect-square object-cover' src={artist.images[0].url}></img> : <BlankPic className='!h-10 mr-2' />}
            <div className='grow truncate' title={artist?.name}>{artist?.name}</div>
            <FontAwesomeIcon className='ml-2 cursor-pointer' icon={faArrowUpRightFromSquare} onClick={handleOpen} title='Open in Spotify' />
        </div>
    );
};

const ArtistSearchResults = ({ searchResults }: any) => {
    return (
        <div>
            {searchResults.length === 0 && <>
                <div className='flex justify-center items-center'>
                    <div>No results</div>
                </div>
            </>}
            {searchResults.length > 0 && <>
                {searchResults.map((artist: any) => {
                    return (
                        <ArtistSearchResult artist={artist} key={artist.id} />
                    );
                }).reduce((p: any, c: any) => {
                    return [p, <Divider key={null} />, c];
                })}
            </>}
        </div>
    );
};

export default ArtistSearchResults;
