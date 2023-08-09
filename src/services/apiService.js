import axios from "axios";

const apiKey = "yJY6KXlpJ5P7NsAnmxH1OGQARlcYeSmQCsUzYVfh";

const fetchImages = async (startDate, endDate) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching images:", error);
  }
};

export { fetchImages };
