import SpotifyWebApi from 'spotify-web-api-node';

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
