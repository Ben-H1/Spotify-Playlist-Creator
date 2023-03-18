import { createContext, useState } from 'react';

export const ConfigContext = createContext<any>(null);

type ConfigContextProviderProps = {
    children?: any;
};

const ConfigContextProvider = ({ children }: ConfigContextProviderProps) => {
    const [artists, setArtists] = useState<Record<string, SpotifyApi.ArtistObjectFull>>({});
    const [albums, setAlbums] = useState<Record<string, any>>({});

    return (
        <ConfigContext.Provider value={{ artists, setArtists, albums, setAlbums }}>
            {children}
        </ConfigContext.Provider>
    );
};

export default ConfigContextProvider;