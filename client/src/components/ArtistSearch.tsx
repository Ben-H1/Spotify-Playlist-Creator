import { useState, useContext } from 'react';
import { ApiContext } from '../App';
import { searchArtists } from '../SpotifyWrapper';
import ArtistSearchResults from './ArtistSearchResults';
import LoadingSpinner from './LoadingSpinner';
import SearchBox from './SearchBox';
import { ConfigContext } from './ConfigContextProvider';

enum SearchStates {
    NONE = 'none',
    LOADING = 'loading',
    COMPLETE = 'complete'
};

const ArtistSearch = () => {
    const { token } = useContext(ApiContext);
    const { artists } = useContext(ConfigContext);

    const [searchState, setSearchState] = useState<SearchStates>(SearchStates.NONE);
    const [searchResults, setSearchResults] = useState<any>([]);

    const handleSearch = async (value: string) => {
        if (value) {
            setSearchState(SearchStates.LOADING);
            setSearchResults(await searchArtists(token, value));
            setSearchState(SearchStates.COMPLETE);
        } else {
            setSearchState(SearchStates.NONE);
        }
    };

    return (
        <div>
            <SearchBox
                searchHandler={handleSearch}
                waitForChangeFinish={true}
            />
            {searchState !== SearchStates.NONE && <>
                <div className='bg-ui-grayscale-400 w-full rounded-lg mt-2 p-2'>
                    {searchState === SearchStates.LOADING && <>
                        <div className='flex justify-center items-center h-10'>
                            <LoadingSpinner className='h-5' />
                        </div>
                    </>}
                    {searchState === SearchStates.COMPLETE && <>
                        <ArtistSearchResults searchResults={searchResults} />
                    </>}
                </div>
            </>}
            {Object.keys(artists).length > 0 && <>
                <div className='bg-ui-grayscale-400 w-full rounded-lg mt-2 p-2'>
                    <ArtistSearchResults searchResults={Object.values(artists)} />
                </div>
            </>}
        </div>
    );
};

export default ArtistSearch;
