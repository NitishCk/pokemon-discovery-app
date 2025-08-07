import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const LIMIT = 6;

const fetchPokemonBatch = async ({ pageParam = 0 }) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${pageParam * LIMIT}&limit=${LIMIT}`);
  const detailedData = await Promise.all(
    res.data.results.map(pokemon => axios.get(pokemon.url).then(res => res.data))
  );
  return {
    pokemon: detailedData,
    nextOffset: pageParam + LIMIT,
    hasMore: !!res.data.next,
  };
};

export default function useInfinitePokemon() {
  return useInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: fetchPokemonBatch,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextOffset : undefined,
    initialPageParam: 0,
  });
}
