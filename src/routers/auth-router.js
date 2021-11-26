import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAction } from '../reducers/authState/authAction';

const AuthRouter = ({ children }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    dispatch(getUserAction());
  }, []);

  return (
    <Route
      render={({ location }) => {
        if (!isAuth) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          );
        }

        return children;
      }}
    />
  );
};

export { AuthRouter };
