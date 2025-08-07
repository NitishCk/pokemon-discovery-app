import React, { useRef, useEffect, useState } from 'react';
import useInfinitePokemon from '../hooks/useInfinitePokemon';
import PokemonCard from '../components/PokemonCard';

export default function DiscoveryPage({ addToCollection }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfinitePokemon();
  const loader = useRef();
  const [addedIds, setAddedIds] = useState([]);

useEffect(() => {
  let observer;
  const timeout = setTimeout(() => {
    observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (loader.current) observer.observe(loader.current);
  }, 500); 

  return () => {
    clearTimeout(timeout);
    if (observer && loader.current) observer.disconnect();
  };
}, [fetchNextPage, hasNextPage]);


  const handleAdd = (pokemon) => {
    if (!addedIds.includes(pokemon.id)) {
      addToCollection(pokemon); 
      setAddedIds([...addedIds, pokemon.id]); 
    }
  };

  return (
    <div className="grid-container">
      {data?.pages.flatMap(page => page.pokemon).map(p => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          isInCollection={addedIds.includes(p.id)}
          onAdd={() => handleAdd(p)}
        />
      ))}
      <div ref={loader} className="loading-text">
        {isFetchingNextPage && <p>Loading more Pokémon...</p>}
      </div>
    </div>
  );
}
