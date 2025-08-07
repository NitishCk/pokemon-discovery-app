export default function PokemonCard({ pokemon, onAdd, isInCollection }) {
  const showButton = typeof onAdd === 'function';

  return (
    <div className="card">
      <div className="card-top">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        {showButton && (
          <button
            className={`card-btn ${isInCollection ? 'remove' : 'add'}`}
            onClick={() => !isInCollection && onAdd?.(pokemon)}
          >
            {isInCollection ? '✖' : '+'}
          </button>
        )}
      </div>
      <h3>{pokemon.name}</h3>
      <div className="types">
        {pokemon.types.map(t => (
          <span key={t.type.name} className={`type ${t.type.name}`}>
            {t.type.name}
          </span>
        ))}
      </div>
      <div className="stats">
        <span><strong>{pokemon.stats[0].base_stat}</strong> HP</span>
        <span><strong>{pokemon.stats[1].base_stat}</strong> Attack</span>
        <span><strong>{pokemon.stats[2].base_stat}</strong> Defense</span>
      </div>
    </div>
  );
}
