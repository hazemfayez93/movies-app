import { Chip } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";

const apiKey = "d73179bec5abd9623f998859c24dd4cf";

const Genres = ({
  genres,
  setGenres,
  type,
  selectedGenres,
  setSelectedGenres,
  setPage,
}) => {
  const handleAddGenre = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleDeleteGenre = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${apiKey}&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();
  }, []);
  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((selectedGenre) => (
          <Chip
            label={selectedGenre.name}
            style={{ margin: 2 }}
            size="small"
            key={selectedGenre.id}
            color="primary"
            onDelete={() => handleDeleteGenre(selectedGenre)}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            label={genre.name}
            clickable
            style={{ margin: 2 }}
            size="small"
            key={genre.id}
            onClick={() => handleAddGenre(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
