import React, { useCallback } from 'react';
import { Route } from 'react-router-dom';

function CustomRoute({ pageType, component: Component, ...rest }) {
  const renderComponent = useCallback(() => (
    <Component pageType={pageType} />
  ), []);

  return (
    <Route render={renderComponent} {...rest} />
  );
}
