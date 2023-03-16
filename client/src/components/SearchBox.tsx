import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

type SearchBoxProps = {
    className?: string;
    placeholder?: string;
    searchHandler: (value: string) => void;
    useOnChange?: boolean;
    waitForChangeFinish?: boolean;
    timeoutMs?: number;
    useOnEnter?: boolean;
};

const SearchBox = ({ className, placeholder, searchHandler, useOnChange = true, waitForChangeFinish, timeoutMs, useOnEnter = true }: SearchBoxProps) => {
    const [previousValue, setPreviousValue] = useState<string>('');

    let changeTimer: NodeJS.Timeout | undefined;
    const typingTimeoutMs = timeoutMs ?? 1000;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        if (useOnChange) {
            if (waitForChangeFinish) {
                clearTimeout(changeTimer);
                changeTimer = setInterval(() => {
                    clearInterval(changeTimer);
                    searchHandler && searchHandler(value);
                    setPreviousValue(value);
                }, typingTimeoutMs);
            } else {
                searchHandler && searchHandler(value);
                setPreviousValue(value);
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        
        if (useOnEnter) {
            if (e.key === 'Enter') {
                if (value !== previousValue) {
                    clearTimeout(changeTimer);
                    searchHandler && searchHandler(value);
                    setPreviousValue(value);
                }
            }
        }
    };

    return (
        <div className={clsx('py-2 px-4 w-full rounded-full bg-white text-black flex justify-center items-center', className)}>
            <FontAwesomeIcon className='mr-2' icon={faSearch} />
            <div className='grow'>
                <input type='text' className='outline-none w-full' size={1} placeholder={placeholder} onChange={handleChange} onKeyDown={handleKeyDown} />
            </div>
            {/* {previousValue && <div className='ml-2'>
                <FontAwesomeIcon className='cursor-pointer' icon={faClose} onClick={() => console.log('x')} />
            </div>} */}
        </div>
    );
};

export default SearchBox;
