import { createStore, applyMiddleware } from 'redux'
import app from '../reducers/Index'
import thunk from 'redux-thunk'

export default function configureStore() {
  let store = createStore(app, applyMiddleware(thunk));
  return store;
}
