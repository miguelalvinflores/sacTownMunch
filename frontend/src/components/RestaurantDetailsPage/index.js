import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as restaurantActions from '../../store/restaurant';

import './RestaurantDetails.css';

export default function RestaurantDetailsPage() {
  const { restaurantId } = useParams();
  const restaurant = useSelector(state => state.restaurant[restaurantId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restaurantActions.getOneRestaurant(restaurantId));
  }, [dispatch, restaurantId]);

  if (!restaurant || !restaurant.full_description) {
    return null;
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
      </div>
    </div>
  );
}
