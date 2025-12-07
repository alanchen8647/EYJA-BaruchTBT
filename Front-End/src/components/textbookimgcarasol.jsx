import placeholderImage from "../../images/placeholder.jpg";

export default function TextbookImgCarousel({ images }) {
  // If no images are passed in, fall back to 3 placeholders
  const slides = images && images.length > 0
    ? images
    : [placeholderImage, placeholderImage, placeholderImage];

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
            <img
              src={src}
              className="d-block w-100"
              alt={`Textbook image ${index + 1}`}
            />
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
