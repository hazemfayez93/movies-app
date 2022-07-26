import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import { img_500, unavailable } from "../config/Config";
import "./ContentModal.css";
import { Button } from "@material-ui/core";
import { YouTube } from "@material-ui/icons";
import Carousel from "../carousel/Carousel";

const apiKey = "d73179bec5abd9623f998859c24dd4cf";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function ContentModal({ children, media_type, id }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [contents, setContents] = useState([]);
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${apiKey}&language=en-US`
    );
    setContents(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${apiKey}&language=en-US`
    );
    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);

  return (
    <React.Fragment>
      <div
        style={{ cursor: "pointer" }}
        onClick={handleOpen}
        color="inherit"
        className="media"
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {contents && (
            <div className={classes.paper}>
              <div className="ContentModal">
                <img
                  className="ContentModal__portrait"
                  src={
                    contents.poster_path
                      ? `${img_500}/${contents.poster_path}`
                      : unavailable
                  }
                  alt={contents.name || contents.title}
                />
                <img
                  className="ContentModal__landscape"
                  src={
                    contents.backdrop_path
                      ? `${img_500}/${contents.backdrop_path}`
                      : unavailable
                  }
                  alt={contents.name || contents.title}
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {contents.name || contents.title} (
                    {(
                      contents.first_air_date ||
                      contents.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {contents.tagline && (
                    <i className="tagline">{contents.tagline}</i>
                  )}
                  <span className="ContentModal__description">
                    {contents.overview}
                  </span>
                  <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>
                  <Button
                    variant="contained"
                    startIcon={<YouTube />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
