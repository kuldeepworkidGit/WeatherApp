import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../SRC/Screens/HomeScreen';
import {getWeather} from '../SRC/Utils/Services';
import {checkWeatherNearMe} from '../SRC/Utils/Helpers';

// Mock Theme Context
jest.mock('../SRC/Theme/ThemeContext', () => ({
  useTheme: jest.fn(() => ({
    theme: 'light',
    //toggleTheme: toggleThemeMock,
  })),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

// Mock API calls
jest.mock('../SRC/Utils/Services', () => ({
  getWeather: jest.fn(),
}));

jest.mock('../SRC/Utils/Helpers', () => ({
  checkWeatherNearMe: jest.fn(),
}));

describe('HomeScreen Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    const {getByPlaceholderText, getByTestId, queryByTestId} = render(
      <HomeScreen />,
    );

    await waitFor(() => expect(queryByTestId('loader')).toBeNull());

    expect(getByPlaceholderText('Search')).toBeTruthy();
    expect(getByTestId('switch-theme')).toBeTruthy();
  });

  it('toggles theme when switch is pressed', async () => {
    const {getByTestId, queryByTestId} = render(<HomeScreen />);

    await waitFor(() => expect(queryByTestId('loader')).toBeNull());

    const themeSwitch = getByTestId('switch-theme');

    fireEvent(themeSwitch, 'valueChange', true);
    // expect(toggleThemeMock).toHaveBeenCalled();
  });

  it('fetches weather data on mount from AsyncStorage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify({
        temp: 30,
        location: 'New York',
        icon: 'icon.png',
        condition: 'Sunny',
      }),
    );

    const {findByText} = render(<HomeScreen />);

    expect(await findByText('New York')).toBeTruthy();
  });

  it('fetches weather data when user enters a location and searches', async () => {
    (getWeather as jest.Mock).mockResolvedValue({
      temp: 28,
      location: 'Los Angeles',
      icon: 'icon.png',
      condition: 'Cloudy',
    });

    const {getByPlaceholderText, getByText, queryByTestId} = render(
      <HomeScreen />,
    );

    await waitFor(() => expect(queryByTestId('loader')).toBeNull());

    fireEvent.changeText(getByPlaceholderText('Search'), 'Los Angeles');
    fireEvent.press(getByText('Search'));

    await waitFor(() => expect(getWeather).toHaveBeenCalledWith('Los Angeles'));
    expect(await getByText('Los Angeles')).toBeTruthy();
  });

  it('displays an error message when weather API fails', async () => {
    (getWeather as jest.Mock).mockResolvedValue({
      error: {message: 'Location not found'},
    });

    const {getByPlaceholderText, getByText, findByText, queryByTestId} = render(
      <HomeScreen />,
    );

    // Wait for loader to disappear before interacting
    await waitFor(() => expect(queryByTestId('loader')).toBeNull());

    fireEvent.changeText(getByPlaceholderText('Search'), 'Invalid Location');
    fireEvent.press(getByText('Search'));

    expect(await findByText('Location not found')).toBeTruthy();
  });

  it('fetches weather data from `checkWeatherNearMe` if AsyncStorage is empty', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (checkWeatherNearMe as jest.Mock).mockResolvedValue({
      temp: 25,
      location: 'San Francisco',
      icon: 'icon.png',
      condition: 'Clear',
    });

    const {findByText} = render(<HomeScreen />);

    expect(await findByText('San Francisco')).toBeTruthy();
  });

  it('shows the loader while fetching data', async () => {
    (getWeather as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({temp: 30}), 2000)),
    );

    const {getByTestId} = render(<HomeScreen />);

    expect(getByTestId('loader')).toBeTruthy();
  });
});
