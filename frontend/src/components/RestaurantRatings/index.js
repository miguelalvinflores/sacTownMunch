import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getRatings } from "../../store/rating";


const RestaurantRatings = ({ restaurant, setEditRatingId }) => {
  console.log('restaurant at res ratings:', restaurant)
  const sessionUser = useSelector( state => state.session.user);
  const ratings = useSelector((state) => {
    if (!restaurant.ratings) return null;
    return restaurant.ratings.map(ratingId => state.ratings[ratingId]);
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRatings(restaurant.id));
  }, [dispatch, restaurant.id]);

  if(!ratings) {
    return null;
  }

  return (
    <div className='reviews-holder'>
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
    </div>
  );
};

export default RestaurantRatings;
