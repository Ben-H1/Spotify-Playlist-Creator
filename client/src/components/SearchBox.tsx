import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { ChangeEvent, useEffect, useState } from 'react';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { Subject } from 'rxjs/internal/Subject';

type SearchBoxProps = {
    className?: string;
    placeholder?: string;
    searchHandler: (value: string) => void;
    waitForChangeFinish?: boolean;
    timeoutMs?: number;
};

const inputChange = new Subject<string>();
const inputChange$ = inputChange.asObservable();

const SearchBox = ({ className, placeholder, searchHandler, waitForChangeFinish, timeoutMs }: SearchBoxProps) => {
    const [currentValue, setCurrentValue] = useState<string>('');

    const typingTimeoutMs = waitForChangeFinish ? timeoutMs ?? 500 : 0;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        setCurrentValue(value);
        inputChange.next(value);
    };

    const handleClear = () => {
        setCurrentValue('');
        inputChange.next('');
    }

    useEffect(() => {
        const subscription = inputChange$.pipe(
            debounceTime(typingTimeoutMs),
            distinctUntilChanged()
        ).subscribe((value) => searchHandler(value));

        return () => {
            return subscription.unsubscribe();
        };
    }, []);

    return (
        <div className={clsx('py-2 px-4 w-full rounded-full bg-white text-black flex justify-center items-center', className)}>
            <FontAwesomeIcon className='mr-2 h-5' fixedWidth icon={faSearch} />
            <div className='grow'>
                <input type='text' className='outline-none w-full' size={1} value={currentValue} placeholder={placeholder} onChange={handleChange} />
            </div>
            {currentValue && <>
                <FontAwesomeIcon className='cursor-pointer ml-2 h-5' icon={faClose} onClick={handleClear} />
            </>}
        </div>
    );
};

export default SearchBox;
