import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import * as restaurantActions from '../../store/restaurant';

import './SplashPage.css';

export default function SplashPage() {
  const dispatch = useDispatch();

  const restaurants = useSelector(state => {
    return state.restaurant.list.map(restaurantId => state.restaurant[restaurantId]);
  })

  useEffect(() => {
    dispatch(restaurantActions.getRestaurants())
  }, [dispatch]);

  if(!restaurants) {
    return null;
  }

  return (
    <main>
      <div className={'container'} >
        {restaurants.map((restaurant) => {
          return (
              <NavLink key={restaurant.restaurant_name} to={`/restuarants/${restaurant.id}`}>
                <div className={"restaurant"}>
                  <div className={"restaurant__entry-image"}>
                    <img src={restaurant.photo_url} alt={restaurant.restaurant_name}/>
                  </div>
                  <div className={"restaurant__info"}>
                    <div className="restaurant__info--title">{restaurant.restaurant_name}</div>
                    <div className="restaurant__info--summary">{restaurant.summary}</div>
                    <div className="restuarant__info--address">{restaurant.address}</div>
                  </div>
                </div>
              </NavLink>
          )
        })}
    </div>
    </main>
  );

}
