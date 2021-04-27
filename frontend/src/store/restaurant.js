const LOAD = "restaurant/LOAD";

const load = list => ({
  type: LOAD,
  list,
});

export const getRestaurants = () => async dispatch => {
  const res = await fetch(`/api/restaurants`);
  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
  }
};

const initialState = {
  list: [],
  types: []
};

const sortList = (list) => {
  return list.sort((restaurantA, restaurantB) => {
    return restaurantA.createdAt - restaurantB.createdAt;
  }).map((restaurant) => restaurant.id)
}

const restaurantReducer = (state = initialState, action) => {
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
  }
}
