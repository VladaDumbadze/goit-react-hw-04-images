import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <button className="Button" onClick={onClick} type="button">
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
