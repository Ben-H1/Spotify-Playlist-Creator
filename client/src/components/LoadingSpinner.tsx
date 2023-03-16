import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

type LoadingSpinnerProps = {
    className?: string;
};

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
    return (
        <FontAwesomeIcon
            className={clsx('animate-spin', className)}
            icon={faSpinner}
        />
    );
};

export default LoadingSpinner;
