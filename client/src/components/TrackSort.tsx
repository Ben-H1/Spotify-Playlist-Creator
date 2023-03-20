import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../App';
import { getMultipleAlbumTracks } from '../SpotifyWrapper';
import { ConfigContext } from './ConfigContextProvider';
import LoadingSpinner from './LoadingSpinner';
import TrackResults from './TrackResults';

type TrackSortProps = {
    isOpen?: boolean;
};

enum SearchStates {
    NONE = 'none',
    LOADING = 'loading',
    COMPLETE = 'complete'
};

const TrackSort = ({ isOpen }: TrackSortProps) => {
    const { token } = useContext(ApiContext);
    const { albums, tracks, setTracks } = useContext(ConfigContext);

    const [searchState, setSearchState] = useState<SearchStates>(SearchStates.NONE);

    useEffect(() => {
        if (isOpen && Object.keys(albums).length > 0) {
            setSearchState(SearchStates.LOADING);
            getMultipleAlbumTracks(token, Object.values(albums)).then((tracks) => {
                let tracksObj: any = {};
                tracks?.forEach((track) => {
                    if (track) {
                        tracksObj[track.id] = track;
                    }
                });
                setTracks(tracksObj);
                setSearchState(SearchStates.COMPLETE);
            });
        } else {
            setSearchState(SearchStates.NONE);
        }
    }, [isOpen, albums]);

    return (
        <div>
            <div>Sort</div>
            <div>Filter</div>
            {searchState !== SearchStates.NONE && <>
                <div className='mt-2'>{`Included tracks: ${Object.keys(albums).length}`}</div>
                <div className='bg-ui-grayscale-400 w-full rounded-lg mt-2 p-2'>
                    {searchState === SearchStates.LOADING && <>
                        <div className='flex justify-center items-center'>
                            <LoadingSpinner className='h-5' />
                        </div>
                    </>}
                    {searchState === SearchStates.COMPLETE && <>
                        <TrackResults searchResults={Object.values(tracks)} />
                    </>}
                </div>
            </>}
        </div>
    );
};

export default TrackSort;
