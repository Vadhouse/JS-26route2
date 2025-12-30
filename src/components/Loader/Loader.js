import BounceLoader from 'react-spinners/BounceLoader';

const Loader = ({ loading = true, size = 155 }) => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.15)',
        zIndex: 9999,
      }}
    >
      <BounceLoader
        color={'#b5156dff'}
        loading={loading}
        size={size}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
};

export default Loader;
