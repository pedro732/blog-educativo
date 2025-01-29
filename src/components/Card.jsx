
import PropTypes from 'prop-types';
import './Card.css';

function Card({ imageUrl, summary, link }) {
  return (
    <div className="card">
      <img src={imageUrl} alt={summary} className="card-image" />
      <div className="card-content">
        <p>{summary}</p>
        <a href={link} target="_blank" rel="noopener noreferrer">Read more</a>
      </div>
    </div>
  );
}

Card.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Card;