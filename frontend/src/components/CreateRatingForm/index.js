import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createRating } from '../../store/rating';

const CreateRatingForm = ({hideForm, restaurant}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector( state => state.session.user);


  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const user_id = sessionUser.id;
  const restaurant_id = restaurant.id;

  const updateComment = (e) => setComment(e.target.value);
  const updateRating = (e) => setRating(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      comment,
      rating,
      user_id,
      restaurant_id,
      date: new Date(),
    };

    const review = await dispatch(createRating(payload, restaurant_id));
    if(review) {
      history.push(`/restaurants/${restaurant.id}`);
      hideForm();
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  return (
    <section className='new-rating-form-holder'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder="Comment"
          required
          value={comment}
          onChange={updateComment} />
        <input
          type="number"
          placeholder="Rating"
          min='0'
          max="5"
          required
          value={rating}
          onChange={updateRating} />
        <button type="submit">Post new Review</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>

  )
};

export default CreateRatingForm;
