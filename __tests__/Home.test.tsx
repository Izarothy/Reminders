import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Home from '../renderer/pages/home';
import { store } from '../renderer/redux/store';

const setup = () => {
  const HomePage = render(
    <Provider store={store}>
      <Home />
    </Provider>
  );

  return HomePage;
};

describe('App', () => {
  it('Should render', () => {
    const HomePage = setup();
    expect(HomePage).toBeTruthy();
  });

  it('Shows the form initially', () => {
    setup();
    const reminderForm = screen.queryByRole('form');
    expect(reminderForm).toBeTruthy();
  });
});
