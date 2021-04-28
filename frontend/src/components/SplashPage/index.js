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
              <div className={"container__restaurant"}>
                <NavLink key={restaurant.restaurant_name} to={`/restuarants/${restaurant.id}`} style={{textDecoration:"none"}}>
                  <div className={"restaurant"}>
                    <div className={"restaurant__entry-image"}>
                      <img src={restaurant.photo_url} alt={restaurant.restaurant_name}/>
                    </div>
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
                    </div>
                  </div>
                </NavLink>
              </div>
          )
        })}
    </div>
    </main>
  );

}
