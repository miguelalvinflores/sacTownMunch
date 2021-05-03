import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from 'react-router-dom';

import { getRatings } from "../../store/rating";
import RestaurantDetailsPage from "../RestaurantDetailsPage";
import CreateRatingForm from '../CreateRatingForm';

import './RestaurantRatings.css'


const RestaurantRatings = ({ restaurant, setEditRatingId }) => {
  console.log('restaurant at res ratings:', restaurant)
  const sessionUser = useSelector( state => state.session.user);
  const ratings = useSelector((state) => {
    if (!restaurant.ratings) return null;
    return restaurant.ratings.map(ratingId => state.ratings[ratingId]);
  });
  const dispatch = useDispatch();

  const[showNewRatingForm, setShowNewRatingForm] = useState(false);

  useEffect(() => {
    dispatch(getRatings(restaurant.id));
  }, [dispatch, restaurant.id]);

  if(!ratings) {
    return null;
  }

  return (
    <div className='reviews-holder'>
      <div className={showNewRatingForm ? 'fab is-hidden new-rating': 'fab new-rating'} onClick={() => setShowNewRatingForm(true)} >
        <span aria-label="add" role="img" className="fab-symbol">➕ Add a Comment</span>
      </div>
      {ratings.map((rating) => (
        <div key={rating.id} className='review'>
          <div className='review__comment'>
            {`Comment: ${rating.comment}`}
          </div>
          <div className='review__rating'>
            {`Rating: ${rating.rating}/5`}
          </div>
          {(rating.user_id === sessionUser.id) && (
          <div className="review-edit">
            <button onClick={() => setEditRatingId(rating.id)}>
              Edit
            </button>
          </div>
        )}
        </div>
      ))}
      {showNewRatingForm? (
        <CreateRatingForm restaurant={restaurant} hideForm={() => setShowNewRatingForm(false)} />
      ): (

        <Route path="/restaurant/:restaurantId">
          <RestaurantDetailsPage/>
        </Route>
      )}
    </div>
  );
};

export default RestaurantRatings;
