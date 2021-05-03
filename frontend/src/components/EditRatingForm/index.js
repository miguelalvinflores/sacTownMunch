import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { updateRating as updateReview } from '../../store/rating';

const EditRatingForm = ({ ratingId, hideForm }) => {
  const review = useSelector(state => state.ratings[ratingId]);
  const dispatch = useDispatch();

  const [comment, setComment] = useState(review.comment);
  const [rating, setRating] = useState(review.rating);

  const updateComment = (e) => setComment(e.target.value);
  const updateRating = (e) => setRating(e.targer.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...review,
      comment,
      rating,
    };

    const updatedReview = await dispatch(updateReview(payload));

    if (updatedReview) {
      hideForm();
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  return (
    <section className="edit-rating-form-holder" >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Comment"
          value={comment}
          onChange={updateComment} />
        <input
          type="score"
          placeholder="Score"
          value={rating}
          onChange={updateRating} />
        <button type="submit">Update Review</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
};

export default EditRatingForm;