import React from 'react';
import PropTypes from 'prop-types';

const ListGroup = ({ items, selectedItem, onItemSelect, textProperty, valueProperty }) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li 
          key={item[valueProperty]} 
          onClick={() => onItemSelect(item)}
          className={item === selectedItem ? "list-group-item active" : "list-group-item"}
          style={{ cursor: "pointer" }}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  selectedItem: PropTypes.object,
  onItemSelect: PropTypes.func.isRequired,
  textProperty: PropTypes.string,
  valueProperty: PropTypes.string
};

export default ListGroup;
