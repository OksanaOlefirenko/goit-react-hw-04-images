import { LoadMore } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <LoadMore type="button" onClick={onClick}>
      <span>Load more</span>
    </LoadMore>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};
