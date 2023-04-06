import { MagnifyingGlass } from 'react-loader-spinner';
export const Loader = () => {
  return (
    <MagnifyingGlass
      visible={true}
      height="80"
      width="80"
      ariaLabel="MagnifyingGlass-loading"
      wrapperStyle={{}}
      wrapperClass="MagnifyingGlass-wrapper"
      glassColor="#c7c537"
      color="#2628ad"
    />
  );
};
export default Loader;
