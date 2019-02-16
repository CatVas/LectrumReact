
import React from 'react';
import renderer from 'react-test-renderer';
import Counter from './';

const renderTree = renderer.create(<Counter count = { 3 } />).toJSON();

test('counter should match snapshot', () => {
    expect(renderTree).toMatchSnapshot();
});
