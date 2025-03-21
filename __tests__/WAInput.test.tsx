import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import WAInput from '../SRC/Components/WAInput';
import { useTheme } from '../SRC/Theme/ThemeContext';

// Mock the theme context
jest.mock('../SRC/Theme/ThemeContext', () => ({
  useTheme: jest.fn(() => ({theme: 'light'})),
}));

describe('WAInput Component', () => {
  it('renders correctly', () => {
    const {getByPlaceholderText, getByText} = render(
      <WAInput onPress={jest.fn()} onChangeText={jest.fn()} />,
    );

    expect(getByPlaceholderText('Search')).toBeTruthy();
    expect(getByText('Search')).toBeTruthy();
  });

  it('calls `onChangeText` when text is entered', () => {
    const onChangeTextMock = jest.fn();
    const {getByPlaceholderText} = render(
      <WAInput onPress={jest.fn()} onChangeText={onChangeTextMock} />,
    );

    fireEvent.changeText(getByPlaceholderText('Search'), 'New York');
    expect(onChangeTextMock).toHaveBeenCalledWith('New York');
  });

  it('calls `onPress` when the search button is clicked', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <WAInput onPress={onPressMock} onChangeText={jest.fn()} />,
    );

    fireEvent.press(getByText('Search'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('displays the search button in loading state when `isLoading` is true', () => {
    const {getByTestId} = render(
      <WAInput onPress={jest.fn()} onChangeText={jest.fn()} isLoading />,
    );

    expect(getByTestId('loader')).toBeTruthy();
  });

  it('applies dark mode styles when theme is `dark`', () => {
    (useTheme as jest.Mock).mockReturnValue({theme: 'dark'});

    const {getByPlaceholderText} = render(
      <WAInput onPress={jest.fn()} onChangeText={jest.fn()} />,
    );

    const inputField = getByPlaceholderText('Search');
    expect(inputField.props.placeholderTextColor).toBe('white'); // Assuming white for dark theme
  });
});
