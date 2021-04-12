import Axios from 'axios';
import { API_URL } from '../config';

const reducerName = `categories`;
const createActionName = (name) => `app/${reducerName}/${name}`;

const FETCH_START = createActionName(`FETCH_START`);
const FETCH_SUCCESS = createActionName(`FETCH_SUCCESS`);
const FETCH_ERROR = createActionName(`FETCH_ERROR`);
const UPDATE_CATEGORY = createActionName(` UPDATE_CATEGORY`);

export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchSuccess = (payload) => ({ payload, type: FETCH_SUCCESS });
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });
export const updateCategory = (payload) => ({
  payload,
  type: UPDATE_CATEGORY,
});
export const fetchCategories = () => (dispatch) => {
  dispatch(fetchStarted());

  Axios.get(`${API_URL}/categories`)
    .then((res) => {
      dispatch(fetchSuccess(res.data));
    })
    .catch((err) => {
      dispatch(fetchError(err.message || true));
    });
};

export const addCategoryRequest = (data, token) => async (dispatch) => {
  dispatch(fetchStarted());
  try {
    await Axios.post(`${API_URL}/categories`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `application/json`,
        data: {
          data,
        },
      },
    });
  } catch (err) {
    dispatch(fetchError(err.message || true));
  }
};

export const editCategoryRequest = (data, token) => async (dispatch) => {
  dispatch(fetchStarted());
  try {
    const res = await Axios.put(`${API_URL}/categories/${data._id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await new Promise((resolve) => resolve());
    dispatch(updateCategory(res.data));
    // dispatch(fetchPhotos());
  } catch (err) {
    dispatch(fetchError(err.message || true));
  }
};

export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }

    case UPDATE_CATEGORY: {
      return {
        ...statePart,
        data: statePart.data.map((data) => {
          if (data._id === action.payload._id) {
            return {
              ...action.payload,
            };
          }
          return data;
        }),
      };
    }
    default:
      return statePart;
  }
}
