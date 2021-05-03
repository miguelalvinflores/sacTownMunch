import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as restaurantActions from '../../store/restaurant';

import './RestaurantDetails.css';

import EditRatingForm from '../EditRatingForm'
import EditRestaurantForm from '../EditRestaurantForm'
import RestaurantRatings from '../RestaurantRatings';

export default function RestaurantDetailsPage() {
  const { restaurantId } = useParams();
  const restaurant = useSelector(state => state.restaurant[restaurantId]);
  // console.log('restaurant:', restaurant)
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
      <EditRatingForm restaurant={restaurant} ratingId={editRatingId} setEditRatingId={setEditRatingId} />
    )
  } else if (showEditRestaurantForm && (restaurant.owner_id === sessionUser.id)) {
    content = (
      <EditRestaurantForm restaurant={restaurant} hideform={() => setShowEditRestaurantForm(false)} />
    )
  } else {
    content = (
        <div className='restaurant-detail__reviews'>
          <h2>Reviews</h2>
          <RestaurantRatings restaurant={restaurant} setEditRatingId={setEditRatingId} />
        </div>
    )
  }

  return (
    <main>
      <div className="restaurant-detail">
        <div className="restaurant-detail-image" >
          <img src={restaurant.photo_url} alt={restaurant.restaurant_name}/>
        </div>
        <div className='all-details'>
          <h1 className={`restaurant-detail__title`}>{restaurant.restaurant_name}</h1>
          {(!showEditRestaurantForm && (restaurant.owner_id === sessionUser.id)) && (
            <button onClick={() => setShowEditRestaurantForm(true)}>Edit Restaurant</button>
            )}
          <div className='restaurant-detail'>
            <div className={"restaurant__info"}>
              <div className="restaurant__info--title">
                <p className={"title__text"}>{restaurant.restaurant_name}</p>
              </div>
              <div className="restaurant__info--summary">
                <p className={"summary__text"}>{restaurant.summary}</p>
              </div>
              <div className="restuarant__info--address">
                <p className={"address__text"}>{restaurant.address}</p>
              </div>
              <div className="restuarant__info--description">
                <p className={"address__text"}>{restaurant.full_description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {content}
    </main>
  );
}
