import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as restaurantActions from '../../store/restaurant';

export default function SplashPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restaurantActions.getRestaurants())
  }, [dispatch]);

  return null;

}
