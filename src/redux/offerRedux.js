import Axios from 'axios';
import { API_URL } from '../config';

const reducerName = `offers`;
const createActionName = (name) => `app/${reducerName}/${name}`;

const FETCH_START = createActionName(`FETCH_START`);
const FETCH_SUCCESS = createActionName(`FETCH_SUCCESS`);
const FETCH_LOADED = createActionName(`FETCH_LOADED`);
const FETCH_ERROR = createActionName(`FETCH_ERROR`);
const UPDATE_OFFER = createActionName(`UPDATE_OFFER`);

export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchSuccess = (payload) => ({ payload, type: FETCH_SUCCESS });
export const fetchLoaded = (payload) => ({ payload, type: FETCH_LOADED });

export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });
export const updateOffer = (payload) => ({
  payload,
  type: UPDATE_OFFER,
});
export const addOfferRequest = (data, token) => async (dispatch) => {
  dispatch(fetchStarted());
  try {
    await Axios.post(`${API_URL}/offers`, data, {
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

export const fetchOffers = () => (dispatch) => {
  dispatch(fetchStarted());

  Axios.get(`${API_URL}/offers`)
    .then((res) => {
      dispatch(fetchSuccess(res.data));
    })
    .catch((err) => {
      dispatch(fetchError(err.message || true));
    });
};

export const editOfferRequest = (data, token) => async (dispatch) => {
  dispatch(fetchStarted());
  try {
    const res = await Axios.put(`${API_URL}/offers/${data._id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `application/json`,
        data: {
          data,
        },
      },
    });

    await new Promise((resolve) => resolve());
    dispatch(updateOffer(res.data));
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
    case UPDATE_OFFER: {
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
