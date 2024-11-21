import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import Joi from "joi-browser";
import Form from "./common/form";

const MovieForms = () => {
  const { id: movieId } = useParams(); // Extract `id` from the route
  const navigate = useNavigate(); // For navigation
  const [data, setData] = useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  });
  const [genres, setGenres] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const genres = getGenres();
    setGenres(genres);

    if (movieId === "new") return; // Skip fetching movie details if adding a new movie

    const movie = getMovie(movieId); // Fetch movie details by ID
    if (!movie) return navigate("/not-found"); // Redirect if movie not found

    setData(mapToViewModel(movie));
  }, [movieId, navigate]);

  const mapToViewModel = (movie) => ({
    _id: movie._id,
    title: movie.title,
    genreId: movie.genre._id,
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
  });

  const schema = {
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().min(0).max(100).label("Number In Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    doSubmit();
  };

  const handleChange = ({ currentTarget: input }) => {
    const updatedData = { ...data };
    updatedData[input.name] = input.value;
    setData(updatedData);
  };

  const doSubmit = () => {
    saveMovie(data); // Save movie data
    navigate("/movies"); // Redirect to movies list
  };

  return (
    <div>
      <h1>{movieId === "new" ? "Add New Movie" : "Edit Movie"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            value={data.title}
            onChange={handleChange}
            name="title"
            id="title"
            type="text"
            className="form-control"
          />
          {errors.title && <div className="alert alert-danger">{errors.title}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="genreId">Genre</label>
          <select
            value={data.genreId}
            onChange={handleChange}
            name="genreId"
            id="genreId"
            className="form-control"
          >
            <option value="" />
            {genres.map((genre) => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))}
          </select>
          {errors.genreId && <div className="alert alert-danger">{errors.genreId}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="numberInStock">Number in Stock</label>
          <input
            value={data.numberInStock}
            onChange={handleChange}
            name="numberInStock"
            id="numberInStock"
            type="number"
            className="form-control"
          />
          {errors.numberInStock && (
            <div className="alert alert-danger">{errors.numberInStock}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="dailyRentalRate">Rate</label>
          <input
            value={data.dailyRentalRate}
            onChange={handleChange}
            name="dailyRentalRate"
            id="dailyRentalRate"
            type="number"
            className="form-control"
          />
          {errors.dailyRentalRate && (
            <div className="alert alert-danger">{errors.dailyRentalRate}</div>
          )}
        </div>

        <button disabled={validate()} className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default MovieForms;
