import React from 'react';
import Like from "./common/like";

const MoviesTable = ({ movies, onDelete, onLike, onSort, sortColumn }) => {

  const raiseSort = (path) => {
    const order = (sortColumn.path === path && sortColumn.order === 'asc') ? 'desc' : 'asc';
    onSort({ path, order });
  };

  const renderSortIcon = (column) => {
    if (column !== sortColumn.path) return null;
    if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => raiseSort("title")}>
            Title {renderSortIcon("title")}
          </th>
          <th onClick={() => raiseSort("genre.name")}>
            Genre {renderSortIcon("genre.name")}
          </th>
          <th onClick={() => raiseSort("numberInStock")}>
            Stock {renderSortIcon("numberInStock")}
          </th>
          <th onClick={() => raiseSort("dailyRentalRate")}>
            Rate {renderSortIcon("dailyRentalRate")}
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {movies.map(movie => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like
                onClick={() => onLike(movie)}
                liked={movie.liked}
              />
            </td>
            <td>
              <button
                onClick={() => onDelete(movie)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
