import { useEffect, useState } from "react";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => {
    try {
      return window.matchMedia(query).matches;
    } catch (error) {
      console.error(error);
      return false;
    }
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    }

    media.addEventListener('change', listener);

    return () => {
      media.removeEventListener('change', listener);
    }
  }, [query]);

  return matches;
}

export default useMediaQuery;