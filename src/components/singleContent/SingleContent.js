import React from "react";
import Badge from "@material-ui/core/Badge";
import { unavailable } from "../config/Config";
import { img_300 } from "../config/Config";
import "./SingleContent.css";
import ContentModal from "../contentModal/ContentModal";

const SingleContent = ({
  id,
  poster,
  title,
  media_type,
  date,
  vote,
  language,
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge
        badgeContent={Math.floor(vote)}
        color={vote >= 6 ? "primary" : "secondary"}
        overlap="rectangular"
      />
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
      />
      <b className="title">
        {language !== "en" && (
          <span
            style={{
              color: "#90cea1",
              fontSize: "smaller",
              marginRight: "5px",
            }}
          >
            [{language}]
          </span>
        )}

        {title}
      </b>
      <span className="subTitle">
        {media_type === "tv" ? "Tv Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
    </ContentModal>
  );
};

export default SingleContent;
