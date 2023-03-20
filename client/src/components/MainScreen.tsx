import { test } from '../SpotifyWrapper';
import AnimatedUnderline from './AnimatedUnderline';
import MainFlow from './MainFlow';

const MainScreen = () => {
    test();
    return (
        <div className='flex flex-col h-full'>
            <div className='text-3xl font-bold mb-4 flex-none'>Spotify Playlist Creator</div>
            <div className='grow flex justify-center items-center'>
                <MainFlow />
            </div>
            <div className='flex-none text-right mt-4'>
                Created by&nbsp;
                <AnimatedUnderline
                    onClick={() => window.open('https://github.com/Ben-H1')}
                >
                    Benedict Hawthorn
                </AnimatedUnderline>
            </div>
        </div>
    );
};

export default MainScreen;
