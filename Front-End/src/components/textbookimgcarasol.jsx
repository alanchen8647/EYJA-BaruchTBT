import React from "react";
import PlaceholderImage from "../../images/placeholder.jpg";
import Textbooks from "../../images/textbooks.jpg";
import Textbooks1 from "../../images/textbooks1.jpg";

export default function TextbookImgCarousel({ images }) {
  // If no images are passed in, fall back to 3 placeholders
  const slides = images && images.length > 0
    ? images
    : [PlaceholderImage];

  const carouselId = "textbookCarousel";

  return (
    <div id={carouselId} className="carousel slide">
      {/* Indicators */}
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target={`#${carouselId}`}
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : undefined}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        {slides.map((src, index) => (
          <div
            key={index}
            className={`carousel-item${index === 0 ? " active" : ""}`}
          >
           <ImageMagnifier src={src} alt={`Textbook image ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#${carouselId}`}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#${carouselId}`}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

function ImageMagnifier({ src, alt }) {
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [showMagnifier, setShowMagnifier] = React.useState(false);
    const [cursorPosition, setCursorPosition] = React.useState({ x: 0, y: 0 });
  
    const handleMouseEnter = (e) => {
      const elem = e.currentTarget;
      const { width, height } = elem.getBoundingClientRect();
      setPosition({ width, height });
      setShowMagnifier(true);
    };
  
    const handleMouseLeave = () => {
      setShowMagnifier(false);
    };
  
    const handleMouseMove = (e) => {
      const elem = e.currentTarget;
      const { top, left } = elem.getBoundingClientRect();
  
      const x = e.pageX - left - window.scrollX;
      const y = e.pageY - top - window.scrollY;
  
      setCursorPosition({ x, y });
    };
  
    return (
      <div
        style={{
          position: "relative",
          cursor: "zoom-in"
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <img
          src={src}
          className="d-block w-100"
          alt={alt}
          style={{ objectFit: 'contain', maxHeight: '500px' }} 
        />
  
        {showMagnifier && (
          <div
            style={{
              position: "absolute",
              left: `${cursorPosition.x - 100}px`,
              top: `${cursorPosition.y - 100}px`,
              pointerEvents: "none",
              height: "200px",
              width: "200px",
              opacity: "1",
              border: "1px solid lightgray",
              backgroundColor: "white",
              backgroundImage: `url('${src}')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${position.width * 2.5}px ${position.height * 2.5}px`,
              backgroundPositionX: `${-cursorPosition.x * 2.5 + 100}px`,
              backgroundPositionY: `${-cursorPosition.y * 2.5 + 100}px`,
              borderRadius: "50%", 
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
              zIndex: 100
            }}
          ></div>
        )}
      </div>
    );
}
