import { createContext } from 'react';
import LoginScreen from './components/LoginScreen';
import MainScreen from './components/MainScreen';
import UserInfo from './components/UserInfo';
import { getAuthUrl } from './SpotifyWrapper';

export const ApiContext = createContext(null as any);

const getUrlParams = (url: any) => {
    return url.split('/').slice(-1)[0].split('?').slice(-1)[0].split('&').reduce((paramsObj: Record<string, string>, paramString: string) => {
        const splitParam = paramString.split('=');
        paramsObj[splitParam[0]] = splitParam[1];
        return paramsObj;
    }, {});
};

const checkBoolParam = (param: string) => param == 'true';

const App = () => {
    const params = getUrlParams(window.location.href);

    const token = params['#access_token'];
    const tokenExpired = checkBoolParam(params['token_expired']);

    const handleLogin = () => {
        const authUrl = getAuthUrl();
        window.location.href = authUrl;
    };

    const handleLogout = () => {
        window.location.href = window.location.origin;
    };

    return (
        <ApiContext.Provider value={{ token }}>
            <div className='p-4 h-screen from-ui-grayscale-300 via-ui-grayscale-100 to-ui-grayscale-100 bg-gradient-to-b text-white font-montserrat'>
                {token && <>
                    <UserInfo
                        handleLogout={handleLogout}
                    />
                    <MainScreen />
                </>}
                {!token && <>
                    <LoginScreen
                        tokenExpired={tokenExpired}
                        handleLogin={handleLogin}
                    />
                </>}
            </div>
        </ApiContext.Provider>
    );
};

export default App;
