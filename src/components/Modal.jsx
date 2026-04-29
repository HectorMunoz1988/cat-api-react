function Modal({ cat, onClose, selectedBreed, breedsMap }) {
  const breedFromCat = cat.breeds?.[0];                         // cat.breeds ? cat.breeds[0] : undefined;

  let breed = null;

  if (breedFromCat) {
    breed = breedFromCat;
  }
  
  else if (selectedBreed && breedsMap[selectedBreed]) {
    breed = breedsMap[selectedBreed];
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>X</button>

        <img src={cat.url} alt="" />

        {breed ? (
          <>
            <h2>{breed.name}</h2>
            <p><b>Temperamento:</b> {breed.temperament}</p>
            <p><b>Origen:</b> {breed.origin}</p>
          </>
        ) : (
          <p>Sin datos de raza</p>
        )}
      </div>
    </div>
  );
}

export default Modal;