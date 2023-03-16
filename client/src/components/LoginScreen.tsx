import Button from './Button';

type LoginScreenProps = {
    handleLogin: () => void;
    tokenExpired?: boolean;
};

const LoginScreen = ({ handleLogin, tokenExpired }: LoginScreenProps) => {
    return (
        <div className='flex flex-col items-center justify-center h-full'>
            <div className='font-bold'>{tokenExpired ? 'Login token expired. Please log in again.' : 'You are not logged in.'}</div>
            <Button
                value='Log in'
                onClick={handleLogin}
                variant='primary'
            />
        </div>
    );
};

export default LoginScreen;
