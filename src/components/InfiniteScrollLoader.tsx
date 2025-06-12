import './InfiniteScrollLoader.css';

interface InfiniteScrollLoaderProps {
  isLoading: boolean;
  hasNextPage: boolean;
}

export const InfiniteScrollLoader = ({ isLoading, hasNextPage }: InfiniteScrollLoaderProps) => {
  if (!isLoading && !hasNextPage) {
    return null;
  }

  return (
    <div className="infinite-scroll-loader">
      <div className="infinite-scroll-loader__spinner">
        <div className="infinite-scroll-loader__dot"></div>
        <div className="infinite-scroll-loader__dot"></div>
        <div className="infinite-scroll-loader__dot"></div>
      </div>
    </div>
  );
}; 