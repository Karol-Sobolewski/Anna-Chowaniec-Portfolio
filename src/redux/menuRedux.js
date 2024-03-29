import Axios from 'axios';
import { API_URL } from '../config';

const reducerName = `menus`;
const createActionName = (name) => `app/${reducerName}/${name}`;

const FETCH_START = createActionName(`FETCH_START`);
const FETCH_SUCCESS = createActionName(`FETCH_SUCCESS`);
const FETCH_ERROR = createActionName(`FETCH_ERROR`);
const UPDATE_MENU = createActionName(` UPDATE_CATEGORY`);
const REMOVE_MENU = createActionName(`REMOVE_MENU`);

export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchSuccess = (payload) => ({ payload, type: FETCH_SUCCESS });
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });
export const updateMenu = (payload) => ({
  payload,
  type: UPDATE_MENU,
});
export const removeMenu = (payload) => ({
  payload,
  type: REMOVE_MENU,
});

export const fetchMenu = () => (dispatch) => {
  dispatch(fetchStarted());

  Axios.get(`${API_URL}/menus`)
    .then((res) => {
      dispatch(fetchSuccess(res.data));
    })
    .catch((err) => {
      dispatch(fetchError(err.message || true));
    });
};

export const addMenuRequest = (data, token) => async (dispatch) => {
  dispatch(fetchStarted());
  try {
    await Axios.post(`${API_URL}/menus`, data, {
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

export const editMenuRequest = (data, token) => async (dispatch) => {
  dispatch(fetchStarted());
  try {
    const res = await Axios.put(`${API_URL}/menus/${data._id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await new Promise((resolve) => resolve());
    dispatch(updateMenu(res.data));
  } catch (err) {
    dispatch(fetchError(err.message || true));
  }
};

export const removeMenuRequest = (data, token) => async (dispatch) => {
  dispatch(fetchStarted());
  try {
    const res = await Axios.delete(`${API_URL}/menus/${data._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        data: {
          data,
        },
      },
    });

    await new Promise((resolve) => resolve());
    dispatch(removeMenu(res.data));
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
    case UPDATE_MENU: {
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
    case REMOVE_MENU: {
      return {
        ...statePart,
        data: statePart.data.filter((i) => i._id !== action.payload._id),
      };
    }
    default:
      return statePart;
  }
}
