import { useEffect, useState } from "react";
import { getCats, getBreeds } from "./services/catApi";

import CatCard from "./components/CatCard";
import Filters from "./components/Filters";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import Modal from "./components/Modal";

import "./App.css";

function App() {
  const [cats, setCats] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [breedsMap, setBreedsMap] = useState({});

  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedType, setSelectedType] = useState("jpg,png,gif");

  const [showFavorites, setShowFavorites] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(0);
  const [selectedCat, setSelectedCat] = useState(null);

  const getFavs = () => {
    const data = localStorage.getItem("favs");
    return data ? JSON.parse(data) : [];
  };

  const saveFavs = (favs) => {
    localStorage.setItem("favs", JSON.stringify(favs));
  };

  useEffect(() => {
    setFavorites(getFavs());
  }, []);

  // Toggle favorito
  const handleFavorite = (cat) => {
    let favs = getFavs();

    if (favs.includes(cat.url)) {
      favs = favs.filter((f) => f !== cat.url);
    } else {
      favs.push(cat.url);
    }

    saveFavs(favs);
    setFavorites(favs);
  };

  // Cargar razas
  useEffect(() => {
    const loadBreeds = async () => {
      const data = await getBreeds();
      setBreeds(data);

      const map = {};
      data.forEach((b) => {
        map[b.id] = {
          name: b.name,
          temperament: b.temperament,
          origin: b.origin,
        };
      });

      setBreedsMap(map);
    };

    loadBreeds();
  }, []);

  // Cargar gatos
  const loadCats = async (pageToLoad = page) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getCats(
        pageToLoad,
        9,
        selectedBreed,
        selectedType
      );

      if (pageToLoad === 0) {
        setCats(data);
      } else {
        setCats((prev) => [...prev, ...data]);
      }
    } catch {
      setError("Error cargando gatos");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadCats(0);
  }, []);

  // Filtros
  useEffect(() => {
    setShowFavorites(false);
    setPage(0);
    loadCats(0);
  }, [selectedBreed, selectedType]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadCats(nextPage);
  };

  const toggleFavorites = () => {
    setShowFavorites((prev) => !prev);
  };

  // Convertir URLs
  const favoriteCats = favorites.map((url) => ({ url }));

  const catsToShow = showFavorites ? favoriteCats : cats;

  return (
    <div className="container">
      <h1>React Cat Gallery API </h1>

      <Filters
        breeds={breeds}
        selectedType={selectedType}
        onFilter={setSelectedBreed}
        onTypeChange={setSelectedType}
        onToggleFavorites={toggleFavorites}
        showFavorites={showFavorites}
      />

      {error && <ErrorMessage message={error} />}

      <div className="grid">
        {catsToShow.map((cat) => (
          <CatCard
            key={cat.url}
            cat={cat}
            onFavorite={handleFavorite}
            isFav={favorites.includes(cat.url)}
            onClick={() => setSelectedCat(cat)}
          />
        ))}
      </div>

      {!showFavorites && loading && <Loader />}

      {!showFavorites && (
        <button onClick={handleLoadMore}>Ver más</button>
      )}

      {selectedCat && (
        <Modal
          cat={selectedCat}
          onClose={() => setSelectedCat(null)}
          selectedBreed={selectedBreed}
          breedsMap={breedsMap}
        />
      )}
    </div>
  );
}

export default App;