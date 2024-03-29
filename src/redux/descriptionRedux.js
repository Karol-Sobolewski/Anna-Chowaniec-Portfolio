import Axios from 'axios';
import { API_URL } from '../config';

const reducerName = `descriptions`;
const createActionName = (name) => `app/${reducerName}/${name}`;

const FETCH_START = createActionName(`FETCH_START`);
const FETCH_SUCCESS = createActionName(`FETCH_SUCCESS`);
const FETCH_LOADED = createActionName(`FETCH_LOADED`);
const FETCH_ERROR = createActionName(`FETCH_ERROR`);
const UPDATE_DESCRIPTION = createActionName(`UPDATE_DESCRIPTION`);

export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchSuccess = (payload) => ({ payload, type: FETCH_SUCCESS });
export const fetchLoaded = (payload) => ({ payload, type: FETCH_LOADED });
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });
export const updateDescription = (payload) => ({
  payload,
  type: UPDATE_DESCRIPTION,
});

export const fetchDescriptions = () => (dispatch) => {
  dispatch(fetchStarted());

  Axios.get(`${API_URL}/descriptions`)
    .then((res) => {
      dispatch(fetchSuccess(res.data));
    })
    .catch((err) => {
      dispatch(fetchError(err.message || true));
    });
};

export const editDescriptionRequest = (descr, token) => async (dispatch) => {
  dispatch(fetchStarted());
  try {
    const res = await Axios.put(`${API_URL}/descriptions/${descr._id}`, descr, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await new Promise((resolve) => resolve());
    dispatch(updateDescription(res.data));
    dispatch(fetchLoaded());
  } catch (err) {
    dispatch(fetchError(err.message || true));
  }
};

export const removeDescriptionImageRequest = (descr, token) => async (
  dispatch
) => {
  dispatch(fetchStarted());
  try {
    await Axios.delete(`${API_URL}/descriptions/image/${descr._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        data: {
          descr,
        },
      },
    });
    await new Promise((resolve) => resolve());
    dispatch(fetchLoaded());
  } catch (err) {
    dispatch(fetchError(err.message || true));
  }
};

export const addDescriptionImageRequest = (image, token) => async (
  dispatch
) => {
  try {
    await Axios.post(`${API_URL}/descriptions/image`, image, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `multipart/form-data`,
      },
      data: `test`,
    });
    await new Promise((resolve) => resolve());
    dispatch(fetchLoaded());
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
    case FETCH_LOADED: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
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
    case UPDATE_DESCRIPTION: {
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
