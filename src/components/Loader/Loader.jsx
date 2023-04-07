import { ProgressBar } from 'react-loader-spinner';
import { Container } from './Loader.styled';
export const Loader = () => {
  return (
    <Container>
      <ProgressBar
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="#ceaf00"
        barColor="#00aeff"
      />
    </Container>
  );
};
export default Loader;
