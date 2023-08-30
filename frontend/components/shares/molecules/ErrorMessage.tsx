import { errorMessageState } from '@/components/shares/atoms/state/errorMessageState';
import { useRecoilValue } from 'recoil';

const ErrorMessage = () => {
  const errorMessage = useRecoilValue(errorMessageState);

  if (!errorMessage) return null;

  return <div>{errorMessage}</div>;
};

export default ErrorMessage;
