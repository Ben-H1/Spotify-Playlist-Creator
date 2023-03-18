import { createContext, useState } from 'react';

export const ConfigContext = createContext<any>(null);

const ConfigContextProvider = ({ children }: any) => {
    const [artists, setArtists] = useState<any>({});

    return (
        <ConfigContext.Provider value={{ artists, setArtists }}>
            {children}
        </ConfigContext.Provider>
    );
};

export default ConfigContextProvider;