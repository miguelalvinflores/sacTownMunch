import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { updateRating as updateReview } from '../../store/rating';

import './EditRatingForm.css';

const EditRatingForm = ({ ratingId, setEditRatingId }) => {
  const review = useSelector(state => state.ratings[ratingId]);
  const dispatch = useDispatch();

  const [comment, setComment] = useState(review.comment);
  const [rating, setRating] = useState(review.rating);

  const updateComment = (e) => setComment(e.target.value);
  const updateRating = (e) => setRating(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...review,
      comment,
      rating,
    };

    const updatedReview = await dispatch(updateReview(payload));

    if (updatedReview) {
      setEditRatingId(null);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setEditRatingId(null);
  };

  return (
    <main>
      <section className="edit-rating-form-holder" >
        <h2 className='edit-review-title'>Edit Your Review</h2>
        <form className='edit-review-form' onSubmit={handleSubmit}>
          Comment:
          <textarea
            type="textarea"
            rows={5}
            cols={60}
            placeholder="Comment"
            value={comment}
            onChange={updateComment} />
          Rating:
          <select
            value={rating}
            onChange={updateRating}
            >
            <option>{"1"}</option>
            <option>{"2"}</option>
            <option>{"3"}</option>
            <option>{"4"}</option>
            <option>{"5"}</option>
          </select>
          <div className='edit-review-btn-holder' >
            <button type="submit">Update Review</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default EditRatingForm;
