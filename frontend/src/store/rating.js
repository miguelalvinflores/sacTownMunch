export const LOAD_RATINGS = 'ratings/LOAD_RATINGS';
export const REMOVE_RATING = 'ratings/REMOVE_RATING';
export const UPDATE_RATING = 'ratings/UPDATE_RATING';
export const ADD_RATING = 'ratings/ADD_RATING';

const load = (ratings, restaurantId) => ({
  type: LOAD_RATINGS,
  ratings,
  restaurantId,
});

const update = rating => ({
  type: UPDATE_RATING,
  rating,
});

const add = rating => ({
  type: ADD_RATING,
  rating,
});

const remove = (ratingId, restaurantId) => ({
  type: REMOVE_RATING,
  ratingId,
  restaurantId,
});

export const getRatings = id => async (dispatch) => {
  const res = await fetch(`/api/restaurants/${id}/ratings`)

  if (res.ok) {
    const ratings = await res.json();
    console.log( 'ratings after fetch:',ratings)
    dispatch(load(ratings, id))
  }
}

export const createRating = (data, restaurantId) => async dispatch => {
  const res = await fetch(`api/restaurants/${restaurantId}/ratings`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if(res.ok) {
    const rating = await res.json();
    dispatch(add(rating));
    return rating;
  }
};

export const updateRating = data => async dispatch => {
  const res = await fetch(`/api/rating/${data.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application.json',
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const rating = await res.json();
    dispatch(update(rating));
    return rating;
  }
};

export const deleteRating = ratingId => async dispatch => {
  const res = await fetch(`/api/ratings/${ratingId}`, {
    method: 'delete',
  });

  if (res.ok) {
    const rating = await res.json();
    dispatch(remove(rating.id, rating.restaurant_id));
  }
};

const initialState = {};
const ratingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_RATINGS: {
      const newRatings = {};
      action.ratings.forEach(rating => {
        newRatings[rating.id] = rating;
      });
      return {
        ...state,
        ...newRatings
      }
    }
    case REMOVE_RATING: {
      const newState = {...state };
      delete newState[action.ratingId];
      return newState;
    }

    case ADD_RATING:
    case UPDATE_RATING: {
      return {
        ...state,
        [action.rating.id]: action.rating,
      };
    }
    default:
      return state;
  }
};

export default ratingsReducer;
