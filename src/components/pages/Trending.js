import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomPagination from "../pagination/CustomPagination";
import SingleContent from "../singleContent/SingleContent";

const apiKey = "d73179bec5abd9623f998859c24dd4cf";

const Trending = () => {
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(1);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=${page}`
    );
    console.log(data);
    setContents(data.results);
  };
  useEffect(() => {
    fetchTrending();
    window.scroll(0, 0);
  }, [page]);
  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="contents">
        {contents &&
          contents.map((content) => (
            <SingleContent
              key={content.id}
              id={content.id}
              media_type={content.media_type}
              poster={content.poster_path}
              title={content.title || content.name}
              vote={content.vote_average}
              date={content.release_date || content.first_air_date}
              language={content.original_language}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} numOfPages={10} />
    </div>
  );
};

export default Trending;
