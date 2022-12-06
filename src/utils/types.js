import propTypes from 'prop-types';

export const ingredientType = propTypes.shape({
  calories: propTypes.number,
  carbohydrates: propTypes.number,
  fat: propTypes.number,
  image: propTypes.string.isRequired,
  image_large: propTypes.string,
  image_mobile: propTypes.string,
  name: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  proteins: propTypes.number,
  type: propTypes.string.isRequired,
  _id: propTypes.string.isRequired
})