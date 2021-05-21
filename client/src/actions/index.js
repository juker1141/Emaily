import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
  // 因為我們要更新使用者剩餘的 credits 數量
  // 所以使用一樣的 reducer 去更新整個使用者就可以了
}

export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post('/api/surveys', values);

  history.push("/surveys");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const deleteSurvey = (id) => async (dispatch) => {
  const res = await axios.delete(`/api/surveys/delete`, { data: { SurveyId: id } });

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};