import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import WAButton from '../SRC/Components/WAButton';
import {useTheme} from '../SRC/Theme/ThemeContext';

// Mock the theme context with proper typing
jest.mock('../SRC/Theme/ThemeContext', () => ({
  useTheme: jest.fn(() => ({ theme: 'light' })),
}));

describe('WAButton Component', () => {
  it('renders the button with the given title', () => {
    const {getByText} = render(<WAButton title="Click Me" />);
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('displays loader when `isLoading` is true', () => {
    const {getByTestId, queryByText} = render(
      <WAButton title="Click Me" isLoading />,
    );
    expect(getByTestId('loader')).toBeTruthy();
    expect(queryByText('Click Me')).toBeNull();
  });

  it('calls `onPress` when clicked', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <WAButton title="Click Me" onPress={onPressMock} />,
    );

    fireEvent.press(getByText('Click Me'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('does not call `onPress` when disabled (isLoading = true)', () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(
      <WAButton title="Click Me" onPress={onPressMock} isLoading />,
    );

    fireEvent.press(getByTestId('loader'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('applies dark mode styles when theme is `dark`', () => {
    // Mock the dark theme for this test
    (useTheme as jest.Mock).mockReturnValue({theme: 'dark'});

    const {getByText} = render(<WAButton title="Click Me" />);
    const buttonText = getByText('Click Me');
    const buttonStyle = buttonText.props.style;

    // Assert that the color is white for dark theme
    expect(buttonStyle).toContainEqual({color: 'white'});
  });
});
