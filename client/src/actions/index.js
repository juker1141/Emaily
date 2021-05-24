import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const addCredits = (quantity) => async (dispatch) => {
  const res = await axios.post('/api/creat-checkout-session', { quantity });
  const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
  stripe.redirectToCheckout({ sessionId: res.data.id })

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const checkoutSuccess = (history) => async (dispatch) => {
  const res = await axios.get('/api/checkout/success');

  history.push("/surveys/addcredits/success");
  dispatch({ type: FETCH_USER, payload: res.data });
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
