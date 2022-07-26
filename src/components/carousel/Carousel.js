import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../config/Config";
import axios from "axios";
import "./Carousel.css";

const apiKey = "d73179bec5abd9623f998859c24dd4cf";

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ id, media_type }) => {
  const [credits, setCredits] = useState([]);

  const items = credits.map((credit) => (
    <div className="carouselItem">
      <img
        src={
          credit.profile_path ? `${img_300}/${credit.profile_path}` : noPicture
        }
        alt={credit?.name}
        className="carouselItem__img"
        onDragStart={handleDragStart}
      />
      <b className="carouselItem__txt">{credit?.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 4,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${apiKey}&language=en-US`
    );
    setCredits(data.cast);
  };

  useEffect(() => {
    fetchCredits();
  }, []);
  return (
    credits.length > 1 && (
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
        autoPlay
        infinite
        disableButtonsControls
        disableDotsControls
      />
    )
  );
};

export default Carousel;
