/* eslint-disable react/prop-types */
import { useState } from "react";
import PropType from "prop-types";
const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "min-content",
  gap: "1rem",
};
const starContainerStyle = {
  display: "flex",
  with: "fit-content",
  gap: "0.25rem",
};

StarRating.propTypes = {
  maxrating: PropType.number,
  color: PropType.string,
  size: PropType.number,
  className: PropType.string,
  messages: PropType.arrayOf(PropType.string),
  onSetRating: PropType.func,
  initialRating: PropType.number,
};

function Star({ onRate, isFilled, onHoverIn, onHoverOut, color, size }) {
  const starStyle = {
    width: `${size}rem`,
    height: `${size}rem`,
    cursor: "pointer",
  };
  return (
    <span
      role="button"
      style={starStyle}
      onClick={() => onRate()}
      onMouseOver={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {isFilled ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          stroke={color}
          fill={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          stroke={color}
          fill="none"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
    </span>
  );
}
export default function StarRating({
  maxRating = 5,
  color = "#ffcc00",
  size = 1.8,
  className = "",
  messages = [], //To display messages instead of numbers
  onSetRating = () => {}, //To get the rating value out of the component
  initialRating = 0,
}) {
  const [rating, setRating] = useState(initialRating);
  const [tempRating, setTempRating] = useState(0);
  const textStyle = {
    fontSize: `${size}rem`,
    lineHeight: "1",
    color,
    margin: "0",
  };
  function handleSetRating(rate) {
    setRating(rate);
    onSetRating(rate);
  }
  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleSetRating(i + 1)}
            isFilled={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}
