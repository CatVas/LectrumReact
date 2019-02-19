
import { mount } from 'enzyme';
import React from 'react';
import { Composer } from './Composer';

const comment = 'Merry Christmas!';
const initialState = {
    comment: '',
};
const props = {
    _createPost:          jest.fn(),
    avatar:               'test avatar',
    currentUserFirstName: 'test user name',
};
const result = mount(<Composer { ...props } />);
const _handleFormSubmitSpy = jest.spyOn(result.instance(), '_handleFormSubmit');
const _submitCommentSpy = jest.spyOn(result.instance(), '_submitComment');
const _submitOnEnter = jest.spyOn(result.instance(), '_submitOnEnter');
const _updateComment = jest.spyOn(result.instance(), '_updateComment');
const updatedState = {
    comment,
};

describe('component Composer', () => {
    test('should have 1 form element', () => {
        expect(result.find('form')).toHaveLength(1);
    });

    test('should have 1 img element', () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test('img should have src attribute equal to avatar', () => {
        expect(result.find('img').filter(`[src="${props.avatar}"]`))
            .toHaveLength(1);
    });

    test('should have 1 input element', () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test('should have 1 section element', () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test('should have 1 textarea element', () => {
        expect(result.find('textarea')).toHaveLength(1);
    });

    test('should have placeholder with currentUserFirstName', () => {
        const textareaTest = result
            .find('textarea')
            .filter(`[placeholder="What do u think, ${props.currentUserFirstName}?"]`);
        expect(textareaTest).toHaveLength(1);
    });

    test('should have valid initial state', () => {
        expect(result.state()).toEqual(initialState);
    });

    test('should have empty textarea value', () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test('should change state correctly', () => {
        result.setState({ comment });
        expect(result.state()).toEqual(updatedState);
        expect(result.find('textarea').text()).toBe(comment);

        result.setState({ comment: '' });
        expect(result.state()).toEqual(initialState);
        expect(result.find('textarea').text()).toBe('');
    });

    test('should handle textarea change event', () => {
        result.find('textarea').simulate('change', {
            target: { value: comment },
        });
        expect(result.find('textarea').text()).toBe(comment);
        expect(result.state()).toEqual(updatedState);
    });

    test('_updateComment shold be called once', () => {
        expect(_updateComment).toHaveBeenCalledTimes(1);
    });

    test('should handle form submit event', () => {
        result.find('form').simulate('submit');
        expect(result.state()).toEqual(initialState);
    });

    test('should call _createPost on form submit', () => {
        expect(props._createPost).toHaveBeenCalledTimes(1);
    });

    test('_handleFormSubmitSpy & _submitCommentSpy should be called once', () => {
        expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
    });

    test('should handle textarea onKeyPress event', () => {
        result.find('textarea').simulate('keyPress', {
            key:            'Enter',
            preventDefault: jest.fn(),
        });
        expect(_submitOnEnter).toHaveBeenCalledTimes(1);
    });

    test('textatea should react on "Enter" key only', () => {
        result.find('textarea').simulate('change', {
            key: 'Lalala',
        });
        expect(_submitOnEnter).toHaveBeenCalledTimes(1);
    });
});
