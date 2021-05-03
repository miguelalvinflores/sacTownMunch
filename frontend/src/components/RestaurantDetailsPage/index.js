import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as restaurantActions from '../../store/restaurant';

import './RestaurantDetails.css';

import EditRatingForm from '../'
import RestaurantRatings from '../RestaurantRatings';

export default function RestaurantDetailsPage() {
  const { restaurantId } = useParams();
  const restaurant = useSelector(state => state.restaurant[restaurantId]);
  const sessionUser = useSelector( state => state.session.user);
  const dispatch = useDispatch();
  const [showEditRestaurantForm, setShowEditRestaurantForm] = useState(false);
  const [editRatingId, setEditRatingId] = useState(null);

  useEffect(() => {
    dispatch(restaurantActions.getOneRestaurant(restaurantId));
    setShowEditRestaurantForm(false);
    setEditRatingId(null);
  }, [dispatch, restaurantId]);

  if (!restaurant || !restaurant.full_description) {
    return null;
  }

  let content = null;

  if (editRatingId) {
    content = (
      <EditRatingForm restaurant={restaurant} ratingId={editRatingId} hideform={() => setEditRatingId(null)} />
    )
  } else if (showEditRestaurantForm && (restaurant.owner_id === sessionUser.id)) {
    content = (
      <EditRatingForm restaurant={restaurant} hideform={() => setShowEditRestaurantForm(false)} />
    )
  } else {
    content = (
      <div className='restaurant-detail'>
        <div className='restaurant-detail__info'>

        </div>
        <div className='restaurant-detail__reviews'>
          <h2>Reviews</h2>
          <RestaurantRatings restaurant={restaurant} setEditRatingId={setEditRatingId} />
        </div>

      </div>
    )
  }

  return (
    <div className="restaurant-detail">
      <div className="restaurant-detail-image-background">
        <div
          className="restaurant-detail-image"
          style={{ backgroundImage: `url('${restaurant.photo_url}')`}}
        ></div>
        <div>
          <h1 className={`restaurant-detail__title`}>{restaurant.restaurant_name}</h1>
        </div>
        <div className={"restaurant__entry-image"}>
          <img src={restaurant.photo_url} alt={restaurant.restaurant_name}/>
        </div>
      </div>
    </div>
  );
}
