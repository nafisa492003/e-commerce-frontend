import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/store.js";
import { fetchSession } from "./redux/slices/authSlice";

function AppWrapper(){
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchSession());
  }, [dispatch]);

  return <App />;
}

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AppWrapper />
  </Provider>
)
