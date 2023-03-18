import { useContext, useState } from 'react';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import AlbumSelect from './AlbumSelect';
import ArtistSearch from './ArtistSearch';
import Button from './Button';
import { ConfigContext } from './ConfigContextProvider';

const MainFlow = () => {
    const { artists } = useContext(ConfigContext);
    const [index, setIndex] = useState(0);

    const nextPanel = () => setIndex(i => i + 1);
    const previousPanel = () => setIndex(i => i - 1);

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
                        <Button value='Next' variant='primary' onClick={nextPanel} />
                    </div>
                </AccordionItem>
                <AccordionItem title='Step 3' titleClassName='font-bold'>
                    <div>
                        <div>third step</div>
                        <div>content</div>
                        <div>content</div>
                        <div>content</div>
                    </div>
                    <div className='flex justify-end px-1'>
                        <Button value='Previous' variant='secondary' onClick={previousPanel} />
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default MainFlow;
