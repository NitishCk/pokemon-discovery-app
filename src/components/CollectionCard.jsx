import React from 'react';

export default function CollectionCard({ pokemon }) {
  return (
    <div className="card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <p>Type: {pokemon.types.map(t => t.type.name).join(', ')}</p>
      <p>HP: {pokemon.stats[0].base_stat}</p>
      <p>Attack: {pokemon.stats[1].base_stat}</p>
      <p>Defense: {pokemon.stats[2].base_stat}</p>
    </div>
  );
}
