function CatCard({ cat, onFavorite, isFav, onClick }) {
  return (
    <div className="card">
      <img src={cat.url} alt="cat" onClick={onClick} />

      <button onClick={() => onFavorite(cat)}>
        {isFav ? "❌ Eliminar de favoritos" : "⭐ Añadir a favoritos"}
      </button>
    </div>
  );
}

export default CatCard;