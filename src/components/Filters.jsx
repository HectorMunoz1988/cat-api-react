function Filters({
  breeds,
  onFilter,
  onTypeChange,
  selectedType,
  onToggleFavorites,
  showFavorites,
}) {
  return (
    <div className="filters">
      
      {/* Desplegable de razas */}
      <select onChange={(e) => onFilter(e.target.value)}>
        <option value="">Todas las razas</option>
        {breeds.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>

      {/* Desplegable de tipos de imagen */}
      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
      >
        <option value="jpg,png,gif">Todos</option>
        <option value="jpg">JPG</option>
        <option value="png">PNG</option>
        <option value="gif">GIF</option>
      </select>

      {/* Favoritos */}
      <button onClick={onToggleFavorites}>
        {showFavorites ? "Volver" : "⭐ Favoritos"}
      </button>

    </div>
  );
}

export default Filters;