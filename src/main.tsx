import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import ConnectedApp from './App';
import store from './redux/store';
import '../static/main.scss';

export const MainStack = () => (
  <Provider store={store.store}>
  <PersistGate loading={null} persistor={store.persistor}>
    <ConnectedApp />
  </PersistGate>
</Provider>
);

export const renderMain = ():void => {
  render(
<MainStack/>, document.getElementById('root'),
  );
  /* istanbul ignore next */
  if (process.env.NODE_ENV === 'development' && module.hot) module.hot.accept();
};
