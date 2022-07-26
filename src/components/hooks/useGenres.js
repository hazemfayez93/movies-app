const useGenres = (selectedGenres) => {
  if (selectedGenres < 1) return "";

  const genresIds = selectedGenres.map((g) => g.id);
  return genresIds.reduce((acc, curr) => acc + "," + curr);
};

export default useGenres;
