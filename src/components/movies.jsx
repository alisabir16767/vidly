import React, { Component } from 'react';
import { getMovies } from "../services/fakeMovieService";
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import { Link } from "react-router-dom";
import _ from 'lodash';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    sortColumn: { path: 'title', order: 'asc' }
  };

  componentDidMount() {
    const allGenres = [{ name: "All Genre", _id: "" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: allGenres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.findIndex(m => m._id === movie._id);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies, selectedGenre, sortColumn } = this.state;

    if (count === 0)
      return <p>There are no movies in the database.</p>;

    const filtered = selectedGenre && selectedGenre._id
      ? allMovies.filter(m => m.genre._id === selectedGenre._id)
      : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const paginatedMovies = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
        <Link to="/new" className="btn btn-primary">
        Add Movies
      </Link>
          <p>Showing {filtered.length} movies in the database.</p>

          <MoviesTable
            movies={paginatedMovies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={this.state.sortColumn}
          />
          <Pagination
            itemsCount={filtered.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
