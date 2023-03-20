import { useContext, useState } from 'react';
import { ApiContext } from '../App';
import { addTracksToPlaylist, createPlaylist } from '../SpotifyWrapper';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import AlbumSelect from './AlbumSelect';
import ArtistSearch from './ArtistSearch';
import Button from './Button';
import { ConfigContext } from './ConfigContextProvider';
import TrackSort from './TrackSort';

const MainFlow = () => {
    const { token } = useContext(ApiContext);
    const { artists, albums, tracks } = useContext(ConfigContext);
    const [index, setIndex] = useState(0);

    const nextPanel = () => setIndex(i => i + 1);
    const previousPanel = () => setIndex(i => i - 1);

    const handleCreate = () => {
        createPlaylist(token, 'test', {}).then((playlist) => {
            console.log(playlist);
            if (playlist) {
                addTracksToPlaylist(token, playlist.id, Object.keys(tracks)).then(r => console.log(r));
            }
        });
    };

    return (
        <div className='bg-black rounded-lg h-content w-content shadow-lg shadow-black p-4 w-1/2'>
            <Accordion index={index} setIndex={setIndex} allowClick={false} variant='single'>
            {/* <Accordion variant='multi'> */}
                <AccordionItem title='Step 1 - Search for artists' className='mb-2' titleClassName='font-bold'>
                    <ArtistSearch />
                    <div className='flex justify-end px-1'>
                        <Button
                            value='Next'
                            variant='primary'
                            onClick={nextPanel}
                            disabled={Object.keys(artists).length === 0}
                        />
                    </div>
                </AccordionItem>
                <AccordionItem title='Step 2 - Select albums' className='mb-2' titleClassName='font-bold'>
                    <AlbumSelect isOpen={index === 1} />
                    <div className='flex justify-end px-1'>
                        <Button className='mr-2' value='Previous' variant='secondary' onClick={previousPanel} />
                        <Button
                            value='Next'
                            variant='primary'
                            onClick={nextPanel}
                            disabled={Object.keys(albums).length === 0}
                        />
                    </div>
                </AccordionItem>
                <AccordionItem title='Step 3 - Sort tracks' className='mb-2' titleClassName='font-bold'>
                    <TrackSort isOpen={index === 2} />
                    <div className='flex justify-end px-1'>
                        <Button className='mr-2' value='Previous' variant='secondary' onClick={previousPanel} />
                        <Button value='Next' variant='primary' onClick={nextPanel} />
                    </div>
                </AccordionItem>
                <AccordionItem title='Step 4 - Additional options' className='mb-2' titleClassName='font-bold'>
                    <div>
                        <div>fourth step</div>
                        <div>image</div>
                        <div>public/private</div>
                        <div>playlist name</div>
                        <div>description</div>
                    </div>
                    <div className='flex justify-end px-1'>
                        <Button className='mr-2' value='Previous' variant='secondary' onClick={previousPanel} />
                        <Button value='Next' variant='primary' onClick={nextPanel} />
                    </div>
                </AccordionItem>
                <AccordionItem title='Step 5 - Review and create' titleClassName='font-bold'>
                    <div>
                        <div>fifth step</div>
                        <div>image</div>
                        <div>{`Track count: ${Object.keys(tracks).length}`}</div>
                        <div>sort info</div>
                        <div>config info</div>
                    </div>
                    <div className='flex justify-end px-1'>
                        <Button className='mr-2' value='Previous' variant='secondary' onClick={previousPanel} />
                        <Button value='Create' variant='primary' onClick={handleCreate} />
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default MainFlow;
