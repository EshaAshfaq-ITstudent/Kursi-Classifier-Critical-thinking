import React, { useState } from "react";

const CategoryDisplay = ({ category, images }) => {
  const [showImages, setShowImages] = useState(false);

  const handleClick = () => {
    setShowImages(!showImages);
  };

  return (
    <div className="category-box">
      <button onClick={handleClick}>
        {category.toUpperCase()} ({images.length})
      </button>
      {showImages && (
        <div className="image-gallery">
          {images.map((img, index) => (
            <img key={index} src={img} alt={`${category}-${index}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDisplay;
