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

export const getRestaurants = () => async dispatch => {
  const res = await fetch(`/api/restaurants`);
  // console.log("fetch api/restaurant", res)
  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
  }
};

export const  getOneRestaurant = id => async dispatch => {
  const res = await fetch(`api/restaurant/${id}`);

  if (res.ok) {
    const restaurant = await res.json();
    dispatch(addOneRestaurant(restaurant));
  }
}

const initialState = {
  list: [],
  types: []
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
    default:
      return state;
  }
}
