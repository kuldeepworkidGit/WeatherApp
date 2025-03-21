import React from 'react';
import {render} from '@testing-library/react-native';
import Loader from '../SRC/Components/Loader';
import {themeLight} from '../SRC/Utils/Color';

describe('Loader Component', () => {
  it('renders an ActivityIndicator with the correct color', () => {
    const {getByTestId} = render(<Loader />);

    const activityIndicator = getByTestId('loader');

    expect(activityIndicator).toBeTruthy();
    expect(activityIndicator.props.color).toBe(themeLight.themeColor);
  });
});
