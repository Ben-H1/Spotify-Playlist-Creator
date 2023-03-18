import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../App';
import { getMultipleArtistAlbums } from '../SpotifyWrapper';
import AlbumResults from './AlbumResults';
import { ConfigContext } from './ConfigContextProvider';
import LoadingSpinner from './LoadingSpinner';

enum SearchStates {
    NONE = 'none',
    LOADING = 'loading',
    COMPLETE = 'complete'
};

const AlbumSelect = ({ isOpen }: any) => {
    const { token } = useContext(ApiContext);
    const { artists } = useContext(ConfigContext);

    const [searchState, setSearchState] = useState<SearchStates>(SearchStates.NONE);
    const [albumResults, setAlbumResults] = useState<any>();

    useEffect(() => {
        if (isOpen && Object.keys(artists).length > 0) {
            setSearchState(SearchStates.LOADING);
            getMultipleArtistAlbums(token, Object.keys(artists)).then((albums) => {
                setAlbumResults(albums);
                setSearchState(SearchStates.COMPLETE);
            });
        } else {
            setSearchState(SearchStates.NONE);
        }
    }, [isOpen]);

    console.log(albumResults);

    return (
        <div>
            {searchState !== SearchStates.NONE && <>
                <div className='bg-ui-grayscale-400 w-full rounded-lg p-2'>
                    {searchState === SearchStates.LOADING && <>
                        <div className='flex justify-center items-center'>
                            <LoadingSpinner className='h-5' />
                        </div>
                    </>}
                    {searchState === SearchStates.COMPLETE && <>
                        <AlbumResults searchResults={Object.values(albumResults)} />
                    </>}
                </div>
            </>}
        </div>
    );
};

export default AlbumSelect;
