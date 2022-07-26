import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  createTheme,
  ThemeProvider,
  Tabs,
  Tab,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SingleContent from "../singleContent/SingleContent";
import CustomPagination from "../pagination/CustomPagination";

const apiKey = "d73179bec5abd9623f998859c24dd4cf";

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#fff",
    },
  },
});

const Search = () => {
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");

  const handleChange = (event, newValue) => {
    setType(newValue);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${
        type ? "tv" : "movie"
      }?api_key=${apiKey}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );
    setContents(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [type, page]);
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", paddingBottom: "15px" }}>
          <TextField
            label="search"
            variant="filled"
            value={searchText}
            onChange={handleSearchChange}
            style={{ flex: 1 }}
            required
          />
          <Button
            variant="contained"
            style={{ marginLeft: 10 }}
            onClick={fetchSearch}
          >
            <SearchIcon />
          </Button>
        </div>
        <Tabs
          value={type}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          style={{ paddingBottom: 25 }}
        >
          <Tab style={{ width: "50%" }} label="search movies" />
          <Tab style={{ width: "50%" }} label="search series" />
        </Tabs>
      </ThemeProvider>
      <div className="contents">
        {contents &&
          contents.map((content) => (
            <SingleContent
              key={content.id}
              id={content.id}
              poster={content.poster_path}
              title={content.title || content.name}
              vote={content.vote_average}
              date={content.release_date || content.first_air_date}
              media_type={type ? "tv" : "movie"}
              language={content.original_language}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination
          setPage={setPage}
          numOfPages={numOfPages > 500 ? 500 : numOfPages}
        />
      )}
    </div>
  );
};

export default Search;
