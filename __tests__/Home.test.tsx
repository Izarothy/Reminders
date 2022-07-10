import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Home from '../renderer/pages/home';
import { store } from '../renderer/redux/store';

describe('App', () => {
  const HomePage = render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  it('should render', () => {
    expect(HomePage).toBeTruthy();
  });
});
