import { useState } from 'react';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import ArtistSearch from './ArtistSearch';
import Button from './Button';

const MainFlow = () => {
    const [index, setIndex] = useState(0);

    const nextPanel = () => setIndex(i => i + 1);
    const previousPanel = () => setIndex(i => i - 1);

    return (
        <div className='bg-black rounded-lg h-content w-content shadow-lg shadow-black p-4'>
            <Accordion index={index} setIndex={setIndex} allowClick={false} variant='single'>
            {/* <Accordion variant='multi'> */}
                <AccordionItem title='Step 1 - Search for an artist' className='mb-2' titleClassName='font-bold'>
                    <ArtistSearch />
                    <div className='flex justify-end px-1'>
                        <Button value='Next' variant='primary' onClick={nextPanel} />
                    </div>
                </AccordionItem>
                <AccordionItem title='Step 2' className='mb-2' titleClassName='font-bold'>
                    <div>
                        <div>second step</div>
                        <div>content</div>
                        <div>content</div>
                        <div>content</div>
                    </div>
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
