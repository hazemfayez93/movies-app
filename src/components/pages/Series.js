import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleContent from "../singleContent/SingleContent";
import CustomPagination from "../pagination/CustomPagination";
import useGenres from "../hooks/useGenres";
import Genres from "../genres/Genres";

const apiKey = "d73179bec5abd9623f998859c24dd4cf";

const Series = () => {
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genreforURL = useGenres(selectedGenres);

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );

    setContents(data.results);
    setNumOfPages(data.total_pages);
  };
  useEffect(() => {
    fetchSeries();
    window.scroll(0, 0);
  }, [page, selectedGenres]);
  return (
    <div>
      <span className="pageTitle">Tv Series</span>
      <Genres
        genres={genres}
        setGenres={setGenres}
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
      />
      <div className="contents">
        {contents &&
          contents.map((content) => (
            <SingleContent
              key={content.id}
              id={content.id}
              media_type="tv"
              poster={content.poster_path}
              title={content.title || content.name}
              vote={content.vote_average}
              date={content.release_date || content.first_air_date}
              language={content.original_language}
            />
          ))}
      </div>
      <CustomPagination
        setPage={setPage}
        numOfPages={numOfPages > 500 ? 500 : numOfPages}
      />
    </div>
  );
};

export default Series;
