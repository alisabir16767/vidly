import React from 'react';

const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  
  const handleClick = (event) => {
    event.stopPropagation();
    props.onClick();
  };

  return (
    <i
      onClick={handleClick}
      className={classes}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
