import Axios from 'axios';
import { API_URL } from '../config';

const reducerName = `photos`;
const createActionName = (name) => `app/${reducerName}/${name}`;

const FETCH_START = createActionName(`FETCH_START`);
const FETCH_SUCCESS = createActionName(`FETCH_SUCCESS`);
const FETCH_ERROR = createActionName(`FETCH_ERROR`);
const ADD_PHOTO = createActionName(`ADD_PHOTO`);
const UPDATE_PHOTO = createActionName(`UPDATE_PHOTO`);
const REMOVE_PHOTO = createActionName(`REMOVE_PHOTO`);
const FETCH_SELECTED_PHOTO = createActionName(`FETCH_SELECTED_PHOTO`);

export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchSuccess = (payload) => ({ payload, type: FETCH_SUCCESS });
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });
export const addNewPhoto = (payload) => ({ payload, type: ADD_PHOTO });
export const updatePhoto = (payload) => ({
  payload,
  type: UPDATE_PHOTO,
});
export const removePhoto = (payload) => ({
  payload,
  type: REMOVE_PHOTO,
});

export const fetchSelectedPhoto = (payload) => ({
  payload,
  type: FETCH_SELECTED_PHOTO,
});

export const fetchPhotos = () => (dispatch) => {
  dispatch(fetchStarted());

  Axios.get(`${API_URL}/photos`)
    .then((res) => {
      dispatch(fetchSuccess(res.data));
    })
    .catch((err) => {
      dispatch(fetchError(err.message || true));
    });
};

export const fetchSelectedPhotoRequest = (photo) => async (dispatch) => {
  dispatch(fetchStarted());

  try {
    const res = await Axios.get(`${API_URL}/photos/${photo._id}`, photo);
    await new Promise((resolve) => resolve());
    dispatch(fetchSuccess(res.data));
  } catch (err) {
    dispatch(fetchError(err.message || true));
  }
};

export const addPhotoRequest = (data, token) => async (dispatch) => {
  dispatch(fetchStarted());
  try {
    const res = await Axios.post(`${API_URL}/photos`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `multipart/form-data`,
      },
    });
  } catch (err) {
    dispatch(fetchError(err.message || true));
  }
};

export const editPhotoRequest = (photo, token) => async (dispatch) => {
  dispatch(fetchStarted());
  try {
    const res = await Axios.put(`${API_URL}/photos/${photo._id}`, photo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await new Promise((resolve) => resolve());
    dispatch(updatePhoto(res.data));
    // dispatch(fetchPhotos());
  } catch (err) {
    dispatch(fetchError(err.message || true));
  }
};

export const removePhotoRequest = (photo, token) => async (dispatch) => {
  dispatch(fetchStarted());
  try {
    const res = await Axios.delete(`${API_URL}/photos/${photo._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        data: {
          photo,
        },
      },
    });

    await new Promise((resolve) => resolve());
    dispatch(removePhoto(res.data));
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

    case ADD_PHOTO: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: [...statePart.data, action.payload],
      };
    }

    case UPDATE_PHOTO: {
      console.log(`state`, statePart);
      console.log(`action`, action.payload);
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

    case FETCH_SELECTED_PHOTO: {
      console.log(`state`, statePart);
      console.log(`action`, action.payload);
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

    case REMOVE_PHOTO: {
      console.log(`state`, statePart);
      console.log(`action`, action.payload);
      return {
        ...statePart,
        data: statePart.data.filter((i) => i._id !== action.payload._id),
      };
    }

    default:
      return statePart;
  }
}
