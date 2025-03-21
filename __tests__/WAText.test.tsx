import React from 'react';
import {render} from '@testing-library/react-native';
import {useTheme} from '../SRC/Theme/ThemeContext';
import WAText from '../SRC/Components/WAText';

// Mock the theme context
jest.mock('../SRC/Theme/ThemeContext', () => ({
  useTheme: jest.fn(() => ({theme: 'light'})),
}));

describe('WAText Component', () => {
  it('renders the text correctly', () => {
    const {getByText} = render(<WAText value="Hello, World!" />);
    expect(getByText('Hello, World!')).toBeTruthy();
  });

  it('applies custom styles correctly', () => {
    const {getByText} = render(
      <WAText value="Styled Text" style={{fontSize: 20, color: 'red'}} />,
    );
    const textElement = getByText('Styled Text');

    expect(textElement.props.style).toContainEqual({
      fontSize: 20,
      color: 'red',
    });
  });

  it('applies dark mode styles when theme is `dark`', () => {
    (useTheme as jest.Mock).mockReturnValue({theme: 'dark'});

    const {getByText} = render(<WAText value="Dark Mode Text" />);
    const textElement = getByText('Dark Mode Text');

    expect(textElement.props.style).toContainEqual({color: 'white'});
  });
});
