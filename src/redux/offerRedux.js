import Axios from 'axios';
import { API_URL } from '../config';

const reducerName = `offers`;
const createActionName = (name) => `app/${reducerName}/${name}`;

const FETCH_START = createActionName(`FETCH_START`);
const FETCH_SUCCESS = createActionName(`FETCH_SUCCESS`);
const FETCH_ERROR = createActionName(`FETCH_ERROR`);

export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchSuccess = (payload) => ({ payload, type: FETCH_SUCCESS });
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });

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
    default:
      return statePart;
  }
}
