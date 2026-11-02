import React from 'react';
import { shallow } from 'enzyme';
import { AuthPage } from '../../components/AuthPage';

const preventDefault = () => {};
const type = (wrapper, name, value) => {
    wrapper.find(`input[name="${name}"]`).simulate('change', { target: { value } });
};

let startLogin, startSignup;

beforeEach(() => {
    startLogin = jest.fn(() => Promise.resolve());
    startSignup = jest.fn(() => Promise.resolve());
});

test('should render login page correctly', () => {
    const wrapper = shallow(<AuthPage mode="login" startLogin={startLogin} startSignup={startSignup} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render sign up page correctly', () => {
    const wrapper = shallow(<AuthPage mode="signup" startLogin={startLogin} startSignup={startSignup} />);
    expect(wrapper).toMatchSnapshot();
});

test('should log in with the entered user ID and password', async () => {
    const wrapper = shallow(<AuthPage mode="login" startLogin={startLogin} startSignup={startSignup} />);
    type(wrapper, 'username', 'suhana');
    type(wrapper, 'password', 'secret123');
    await wrapper.find('form').prop('onSubmit')({ preventDefault });
    expect(startLogin).toHaveBeenLastCalledWith('suhana', 'secret123');
    expect(startSignup).not.toHaveBeenCalled();
});

test('should require user ID and password', async () => {
    const wrapper = shallow(<AuthPage mode="login" startLogin={startLogin} startSignup={startSignup} />);
    await wrapper.find('form').prop('onSubmit')({ preventDefault });
    expect(startLogin).not.toHaveBeenCalled();
    expect(wrapper.find('.form__error').length).toBe(1);
});

test('should show the server error when login fails', async () => {
    startLogin = jest.fn(() => Promise.reject(new Error('Incorrect user ID or password')));
    const wrapper = shallow(<AuthPage mode="login" startLogin={startLogin} startSignup={startSignup} />);
    type(wrapper, 'username', 'suhana');
    type(wrapper, 'password', 'wrong');
    await wrapper.find('form').prop('onSubmit')({ preventDefault });
    expect(wrapper.find('.form__error').text()).toBe('Incorrect user ID or password');
    expect(wrapper.find('button').prop('disabled')).toBe(false);
});

test('should reject sign up when passwords do not match', async () => {
    const wrapper = shallow(<AuthPage mode="signup" startLogin={startLogin} startSignup={startSignup} />);
    type(wrapper, 'username', 'suhana');
    type(wrapper, 'password', 'secret123');
    type(wrapper, 'confirmPassword', 'secret124');
    await wrapper.find('form').prop('onSubmit')({ preventDefault });
    expect(startSignup).not.toHaveBeenCalled();
    expect(wrapper.find('.form__error').text()).toBe("Passwords don't match");
});

test('should reject sign up with a short password', async () => {
    const wrapper = shallow(<AuthPage mode="signup" startLogin={startLogin} startSignup={startSignup} />);
    type(wrapper, 'username', 'suhana');
    type(wrapper, 'password', 'short');
    type(wrapper, 'confirmPassword', 'short');
    await wrapper.find('form').prop('onSubmit')({ preventDefault });
    expect(startSignup).not.toHaveBeenCalled();
});

test('should sign up when the form is valid', async () => {
    const wrapper = shallow(<AuthPage mode="signup" startLogin={startLogin} startSignup={startSignup} />);
    type(wrapper, 'username', 'suhana');
    type(wrapper, 'password', 'secret123');
    type(wrapper, 'confirmPassword', 'secret123');
    await wrapper.find('form').prop('onSubmit')({ preventDefault });
    expect(startSignup).toHaveBeenLastCalledWith('suhana', 'secret123');
});
