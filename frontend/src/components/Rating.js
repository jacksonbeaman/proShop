import PropTypes from 'prop-types';

// can use inline style in React with double curly braces {{}}

const Rating = ({ value, text, color }) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i}>
        <i
          style={{ color }}
          className={
            value >= 1 + i
              ? 'fas fa-star'
              : value >= 0.5 + i
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
    );
  }

  return (
    <div className='rating'>
      {stars}
      <span>{text && text}</span>
    </div>
  );
};

// in case color prop is not passed in
Rating.defaultProps = {
  color: '#f8e825',
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Rating;

/* <span>
        <i
          style={{ color }}
          className={
            value >= 1
              ? 'fas fa-star'
              : value >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 2
              ? 'fas fa-star'
              : value >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 3
              ? 'fas fa-star'
              : value >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 4
              ? 'fas fa-star'
              : value >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 5
              ? 'fas fa-star'
              : value >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>{text && text}</span> */

/*
return stars array:

const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(
      <span>
        <i
          style={{ color }}
          className={
            value >= 1 + i
              ? 'fas fa-star'
              : value >= 0.5 + i
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
    );
  }
*/
