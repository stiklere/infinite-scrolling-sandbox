import React, { useState, useEffect } from "react";
import { fetchImages } from "../services/apiService";
import "./infiniteScroll.style.css";

const calculateDateRange = (endDate, daysAgo) => {
  const endDateObj = new Date(endDate);
  const startDate = new Date(endDateObj);
  startDate.setDate(endDateObj.getDate() - daysAgo);
  return {
    formattedStartDate: startDate.toISOString().split("T")[0],
    formattedEndDate: endDateObj.toISOString().split("T")[0],
  };
};

const InfiniteScroll = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date();
        const { formattedStartDate, formattedEndDate } = calculateDateRange(
          today,
          9
        );

        const data = await fetchImages(formattedStartDate, formattedEndDate);

        setImages(data);
      } catch (error) {
        console.log("Error fetching images:", error);
      }
    };

    fetchData();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      images.length > 0
    ) {
      const lastImageDate = new Date(images[images.length - 1].date);
      const { formattedStartDate, formattedEndDate } = calculateDateRange(
        lastImageDate,
        9
      );

      fetchImages(formattedStartDate, formattedEndDate)
        .then((data) => {
          setImages((prevImages) => [...prevImages, ...data]);
        })
        .catch((error) => {
          console.log("Error fetching images:", error);
        });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [images]);

  return (
    <div className="container">
      {images.map((image, index) => (
        <img
          key={`${image.date}-${index}`}
          src={image.url}
          alt={image.title}
          className="image"
        />
      ))}
    </div>
  );
};

export default InfiniteScroll;
