import { LOAD_RATINGS, REMOVE_RATING, ADD_RATING } from './rating';
import { csrfFetch } from './csrf';

const LOAD = "restaurant/LOAD";
const ADD_ONE = "restaurant/ADD_ONE";

const load = list => ({
  type: LOAD,
  list,
});

const addOneRestaurant = restaurant => ({
  type: ADD_ONE,
  restaurant,
})

export const createRestaurant = data => async dispatch => {
  const res = await csrfFetch(`/api/restaurants`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if(res.ok) {
    const restaurant = await res.json()
    dispatch(addOneRestaurant(restaurant));
    return restaurant;
  }
};

export const updateRestaunt = data => async dispatch => {
  const res = await csrfFetch(`/api/restaurants/${data.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if(res.ok) {
    const restaurant = await res.json();
    dispatch(addOneRestaurant(restaurant));
    return restaurant;
  }
}

export const getRestaurants = () => async dispatch => {
  const res = await fetch(`/api/restaurants`);
  // console.log("fetch api/restaurant", res)
  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
  }
};

export const getOneRestaurant = id => async dispatch => {
  const res = await fetch(`/api/restaurants/${id}`);

  if (res.ok) {
    const restaurant = await res.json();
    dispatch(addOneRestaurant(restaurant));
  }
}

const initialState = {
  list: [],
};

const sortList = (list) => {
  return list.sort((restaurantA, restaurantB) => {
    return restaurantA.createdAt - restaurantB.createdAt;
  }).map((restaurant) => restaurant.id)
}

export default function restaurantReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD: {
      const allRestaurants = {};
      action.list.forEach(restaurant => {
        allRestaurants[restaurant.id] = restaurant;
      });
      return {
        ...allRestaurants,
        ...state,
        list: sortList(action.list),
      }
    }
    case ADD_ONE: {
      if (!state[action.restaurant.id]) {
        const newState = {
          ...state,
          [action.restaurant.id]: action.restaurant
        };
        const restaurantList = newState.list.map(id => newState[id]);
        restaurantList.push(action.restaurant);
        newState.list = sortList(restaurantList);
        return newState;
      }
      return {
        ...state,
        [action.restaurant.id]: {
        ...state[action.restaurant.id],
        ...action.restaurant,
        }
      };
    }
    case LOAD_RATINGS: {
      return {
        ...state,
        [action.restaurantId]: {
          ...state[action.restaurantId],
          ratings: action.ratings.map(rating => rating.id),
        }
      };
    }
    case REMOVE_RATING: {
      return {
        ...state,
        [action.restaurantId]: {
          ...state[action.restaurantId],
          ratings: state[action.restaurantId].filter(
            (rating) => rating.id !== action.itemId
          ),
        },
      };
    }
    case ADD_RATING: {
      return {
        ...state,
        [action.rating.restaurant_id]: {
          ...state[action.rating.restaurant_id],
          ratings: [...state[action.rating.restaurant_id].ratings, action.rating.id],
        },
      };
    }
    default:
      return state;
  }
}
