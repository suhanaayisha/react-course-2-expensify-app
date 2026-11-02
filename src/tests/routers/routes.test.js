import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';
import { PrivateRoute } from '../../routers/PrivateRoute';
import { PublicRoute } from '../../routers/PublicRoute';
import Header from '../../components/Header';

const Page = () => <p>page</p>;
const location = { pathname: '/edit/1' };

const renderRoute = (element, props = { location }) => shallow(element).prop('render')(props);

test('PrivateRoute should show the page with a header when signed in', () => {
    const output = shallow(renderRoute(<PrivateRoute isAuthenticated={true} component={Page} path="/" />));
    expect(output.find(Header).length).toBe(1);
    expect(output.find(Page).length).toBe(1);
});

test('PrivateRoute should redirect to login, remembering the page, when signed out', () => {
    const output = renderRoute(<PrivateRoute isAuthenticated={false} component={Page} path="/" />);
    expect(output.type).toBe(Redirect);
    expect(output.props.to).toEqual({ pathname: '/login', state: { from: location } });
});

test('PublicRoute should show the page when signed out', () => {
    const output = renderRoute(<PublicRoute isAuthenticated={false} component={Page} path="/login" />);
    expect(output.type).toBe(Page);
});

test('PublicRoute should send signed-in users back where they came from', () => {
    const output = renderRoute(
        <PublicRoute isAuthenticated={true} component={Page} path="/login" />,
        { location: { state: { from: location } } }
    );
    expect(output.type).toBe(Redirect);
    expect(output.props.to).toEqual(location);
});

test('PublicRoute should send signed-in users to the dashboard by default', () => {
    const output = renderRoute(
        <PublicRoute isAuthenticated={true} component={Page} path="/login" />,
        { location: {} }
    );
    expect(output.props.to).toBe('/');
});
