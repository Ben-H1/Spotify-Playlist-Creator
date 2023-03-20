import { useContext } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { ApiContext } from './App';
import { AlbumTypes } from './components/ConfigContextProvider';

const clientId = '4b34c2f1948747ff86262701df460164';
const redirectUri = 'http://localhost:5173/';
const scopes = [
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-private',
    'playlist-modify-public'
];

const spotifyClient = new SpotifyWebApi({
    clientId: '4b34c2f1948747ff86262701df460164'
});

const logOut = () => {
    window.location.href = `${window.location.origin}?token_expired=true`;
};

export const getAuthUrl = () => {
    const apiUrl = new URL('https://accounts.spotify.com/authorize');

    apiUrl.searchParams.set('client_id', clientId);
    apiUrl.searchParams.set('response_type', 'token');
    apiUrl.searchParams.set('redirect_uri', redirectUri);
    apiUrl.searchParams.set('scope', scopes.join(','));
    apiUrl.searchParams.set('show_dialog', 'true');

    return apiUrl.toString();
};

export const getMe = async (token: string) => {
    spotifyClient.setAccessToken(token);
    
    try {
        return (await spotifyClient.getMe()).body;
    } catch (e) {
        logOut();
    }
};

export const searchArtists = async (token: string, searchTerm: string) => {
    spotifyClient.setAccessToken(token);

    try {
        return (await spotifyClient.searchArtists(searchTerm, { limit: 10 })).body?.artists?.items;
    } catch (e) {
        logOut();
    }
};

export const getMultipleArtistAlbums = async (token: string, artistIds: string[], albumTypes: AlbumTypes[]) => {
    try {
        const promises = artistIds.map(async (artistId) => {
            return getArtistAlbums(token, artistId, albumTypes);
        });

        return (await Promise.all(promises)).flat();
    } catch (e) {
        logOut();
    }
};

export const getArtistAlbums = async (token: string, artistId: string, albumTypes: AlbumTypes[]) => {
    spotifyClient.setAccessToken(token);

    try {
        const albums = [];
        let loop = true;
        let limit = 50;
        let offset = 0;
    
        do {
            const options = { limit, offset, 'album_type': albumTypes.join(',') };
            const res = (await spotifyClient.getArtistAlbums(artistId, options)).body;
            albums.push(...res.items);
            offset += limit;
            loop = !!res.next;
        } while (loop);
    
        return albums;
    } catch (e) {
        logOut();
    }
};

export const getMultipleAlbumTracks = async (token: string, albums: SpotifyApi.AlbumObjectFull[]) => {
    try {
        const promises = albums.map(async (album) => {
            return getAlbumTracks(token, album);
        });

        return (await Promise.all(promises)).flat();
    } catch (e) {
        logOut();
    }
};

export const getAlbumTracks = async (token: string, album: SpotifyApi.AlbumObjectFull) => {
    spotifyClient.setAccessToken(token);

    try {
        const songs = [];
        let loop = true;
        let limit = 50;
        let offset = 0;

        do {
            const options = { limit, offset };
            const res = (await spotifyClient.getAlbumTracks(album.id, options)).body;
            const items = res.items.map((track) => ({ ...track, album }));
            songs.push(...items);
            offset += limit;
            loop = !!res.next;
        } while (loop);

        return songs;
    } catch (e) {
        logOut();
    }
};

export const createPlaylist = async (token: string, title: string, options: any) => {
    spotifyClient.setAccessToken(token);

    try {
        return (await spotifyClient.createPlaylist(title, options)).body;
    } catch (e) {
        logOut();
    }
};

export const addTracksToPlaylist = async (token: string, playlistId: string, trackIds: string[]) => {
    spotifyClient.setAccessToken(token);

    try {
        return (await spotifyClient.addTracksToPlaylist(playlistId, trackIds.map(id => `spotify:track:${id}`))).body;
    } catch (e) {
        logOut();
    }
};
