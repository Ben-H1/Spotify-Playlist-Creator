import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../App';
import { getMultipleArtistAlbums } from '../SpotifyWrapper';
import AlbumResults from './AlbumResults';
import { AlbumTypes, ConfigContext, getAlbumTypeName } from './ConfigContextProvider';
import LoadingSpinner from './LoadingSpinner';

enum SearchStates {
    NONE = 'none',
    LOADING = 'loading',
    COMPLETE = 'complete'
};

const AlbumType = ({ type }: any) => {
    const { includeAlbumTypes, setIncludeAlbumTypes } = useContext(ConfigContext);
    const [checked, setChecked] = useState<boolean>(includeAlbumTypes.includes(type));

    useEffect(() => setChecked(includeAlbumTypes.includes(type)), [includeAlbumTypes]);

    const handleCheck = () => {
        const nextState = !checked;
        setChecked(nextState);

        if (nextState) {
            setIncludeAlbumTypes([...includeAlbumTypes, type]);
        } else {
            const types = [...includeAlbumTypes];
            types.splice(includeAlbumTypes.indexOf(type), 1);
            setIncludeAlbumTypes(types);
        }
    };

    return (
        <div className='p-2 hover:bg-ui-grayscale-500 flex items-center select-none' onClick={handleCheck}>
            {checked && <FontAwesomeIcon className='mr-2' icon={faCheck} />}
            <div className='grow truncate' title={getAlbumTypeName(type)}>{getAlbumTypeName(type)}</div>
        </div>
    );
};

const AlbumSelect = ({ isOpen }: any) => {
    const { token } = useContext(ApiContext);
    const { artists, includeAlbumTypes, albums, setAlbums } = useContext(ConfigContext);

    const [searchState, setSearchState] = useState<SearchStates>(SearchStates.NONE);

    useEffect(() => {
        if (isOpen && Object.keys(artists).length > 0) {
            setSearchState(SearchStates.LOADING);
            getMultipleArtistAlbums(token, Object.keys(artists), includeAlbumTypes).then((albums) => {
                let albumsObj: any = {};
                albums?.forEach((album) => {
                    if (album) {
                        albumsObj[album.id] = album;
                    }
                });
                setAlbums(albumsObj);
                setSearchState(SearchStates.COMPLETE);
            });
        } else {
            setSearchState(SearchStates.NONE);
        }
    }, [isOpen, includeAlbumTypes]);

    return (
        <div>
            <div>Album types</div>
            <div className='bg-ui-grayscale-400 w-full rounded-lg mt-2 p-2'>
                <AlbumType type={AlbumTypes.ALBUM} />
                <AlbumType type={AlbumTypes.SINGLE} />
                <AlbumType type={AlbumTypes.APPEARS_ON} />
                <AlbumType type={AlbumTypes.COMPILATION} />
            </div>
            {searchState !== SearchStates.NONE && <>
                <div className='mt-2'>{`Included albums: ${Object.keys(albums).length}`}</div>
                <div className='bg-ui-grayscale-400 w-full rounded-lg mt-2 p-2'>
                    {searchState === SearchStates.LOADING && <>
                        <div className='flex justify-center items-center'>
                            <LoadingSpinner className='h-5' />
                        </div>
                    </>}
                    {searchState === SearchStates.COMPLETE && <>
                        <AlbumResults searchResults={Object.values(albums)} />
                    </>}
                </div>
            </>}
        </div>
    );
};

export default AlbumSelect;
