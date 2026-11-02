import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

test('should render Header correctly', () => {
    const wrapper = shallow(<Header username="suhana" startLogout={() => {}} history={{}} />);
    expect(wrapper).toMatchSnapshot();
});

test('should log out and go to the login page', async () => {
    const startLogout = jest.fn(() => Promise.resolve());
    const history = { replace: jest.fn() };
    const wrapper = shallow(<Header username="suhana" startLogout={startLogout} history={history} />);
    await wrapper.find('.header__logout').prop('onClick')();
    expect(startLogout).toHaveBeenCalled();
    expect(history.replace).toHaveBeenLastCalledWith('/login');
});
