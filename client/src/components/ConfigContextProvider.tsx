import { createContext, useState } from 'react';

export const ConfigContext = createContext<any>(null);

type ConfigContextProviderProps = {
    children?: any;
};

export enum AlbumTypes {
    ALBUM = 'album',
    SINGLE = 'single',
    APPEARS_ON = 'appears_on',
    COMPILATION = 'compilation'
};

export const getAlbumTypeName = (typeName: string) => ({
    [AlbumTypes.ALBUM]: 'Album',
    [AlbumTypes.SINGLE]: 'Single',
    [AlbumTypes.APPEARS_ON]: 'Appears on',
    [AlbumTypes.COMPILATION]: 'Compilation'
})[typeName];

export enum SortTypes {

}

const ConfigContextProvider = ({ children }: ConfigContextProviderProps) => {
    const [artists, setArtists] = useState<Record<string, SpotifyApi.ArtistObjectFull>>({});
    const [includeAlbumTypes, setIncludeAlbumTypes] = useState<AlbumTypes[]>([
        AlbumTypes.ALBUM,
        AlbumTypes.SINGLE,
        AlbumTypes.APPEARS_ON,
        AlbumTypes.COMPILATION
    ]);
    const [albums, setAlbums] = useState<Record<string, SpotifyApi.AlbumObjectFull>>({});
    const [tracks, setTracks] = useState<Record<string, SpotifyApi.TrackObjectFull>>({});

    return (
        <ConfigContext.Provider value={{
            artists, setArtists,
            includeAlbumTypes, setIncludeAlbumTypes,
            albums, setAlbums,
            tracks, setTracks
        }}>
            {children}
        </ConfigContext.Provider>
    );
};

export default ConfigContextProvider;
