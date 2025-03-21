import React from 'react';
import {render} from '@testing-library/react-native';
import WeatherCard from '../SRC/Components/WeatherCard';
import {useTheme} from '../SRC/Theme/ThemeContext';

// Mock the theme context
jest.mock('../SRC/Theme/ThemeContext', () => ({
  useTheme: jest.fn(() => ({theme: 'light'})),
}));

describe('WeatherCard Component', () => {
  const mockProps = {
    temperature: 25,
    location: 'New York',
    icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
    condition: 'Partly Cloudy',
  };

  it('renders correctly with given props', () => {
    const {getByText, getByTestId} = render(<WeatherCard {...mockProps} />);

    expect(getByText('25°C')).toBeTruthy();
    expect(getByText('New York')).toBeTruthy();
    expect(getByText('Partly Cloudy')).toBeTruthy();
    expect(getByTestId('weather-icon').props.source.uri).toBe(
      `https:${mockProps.icon}`,
    );
  });

  it('applies dark mode styles when theme is `dark`', () => {
    (useTheme as jest.Mock).mockReturnValue({theme: 'dark'});

    const {getByTestId} = render(<WeatherCard {...mockProps} />);
    const container = getByTestId('weather-card');

    expect(container.props.style).toContainEqual({backgroundColor: '#404040'});
  });
});
