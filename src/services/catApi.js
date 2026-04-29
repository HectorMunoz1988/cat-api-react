const BASE_URL = "https://api.thecatapi.com/v1";

export const getCats = async (
  page = 0,
  limit = 9,
  breed = "",
  type = "jpg,png,gif"
) => {
  const url = `${BASE_URL}/images/search?limit=${limit}&page=${page}&breed_ids=${breed}&mime_types=${type}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Error obteniendo gatos");
  }

  return await res.json();
};

export const getBreeds = async () => {
  const res = await fetch(`${BASE_URL}/breeds`);

  if (!res.ok) {
    throw new Error("Error obteniendo razas");
  }

  return await res.json();
};