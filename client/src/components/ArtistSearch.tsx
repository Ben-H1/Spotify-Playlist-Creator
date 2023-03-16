import SearchBox from './SearchBox';

const handleSearch = (value: string) => {
    console.log(`Searching for: ${value}`);
};

const ArtistSearch = () => {
    return (
        <div>
            <SearchBox searchHandler={handleSearch} waitForChangeFinish={true} />
        </div>
    );
};

export default ArtistSearch;
