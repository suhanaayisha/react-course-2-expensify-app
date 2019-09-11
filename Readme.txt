74.
Part 1: learnt fundamentals of working with react library like rendering to the screen,
responding to user interaction, etc.
Part 2: More advanced features, more tools and libraries
- user account, authentication, database, data storage, deployment and more
- by the end: real shareable url that we can share with anybody
URLs:
view the app: https://budget-app.mead.io/
final source code: https://links.mead.io/budget-app
About the app:
- have to log in to use the app
- inside the app: sort, filter, add, validation, edit
- focus on client side routing: it will allow us to set up an app with distinct pages each
   with its own url
- to get client side routing integrated to our app, we will be using the react router library.

------------------------------------------------------------------------------------------------------------

75. Server vs. Client Routing

                Server                      |                    Client
Traditional: Define routes on the server    | Modern: use client side javascript to dynamically
                                            | change what gets shown on the screen.  
                                            |
                                            | Made popular by angular, amber, react,backbone
                                            |
Assume we visit a url for the first time or | First time we load an app, we do have to go to
click a link:                               | the server but every other action such as 
Browser detects the change, makes http req  | user clicking on a link, or redirection is handled
to server, server responds with html that   | by client side js. 
                                            | We use html5 history api to watch for url changes, and
should be shown, browser goes ahead and     | run js code when a change occurs.
renders things.                             | When url changes, we find the matching component and
                                            | render with js function call
                                            |
This process is expensive: making http req  |Much faster
and waiting for response takes time         |      

------------------------------------------------------------------------------------------------------------

76. Setting up budget app

Before we can introduce react router, we need a place to put that code. We will create our
own boilerplate that we will be able to clone when we are ready to build a new project, and
expand on it as we add more features. 
- clone indecision app
- remove files specific to the app

--------------------------------------------------------------------------------------------

77. Installing and setting up react router

Learn more about react-router: react-router in github->reacttraining.com/react-router

install react-router: yarn add react-router
react-router-dom: in context of web app -- we are goint to be uaing this
react-router-native: in context of native app

import stuff from react-router-dom in app.js: BrowserRouter once to create the new router
Route for every single page. It has a path and what should happen when user visits that path

set a const routes to some jsx:
const routes= ( 

);

create a new instance of BrowserRouter within:
const routes= ( 
    <BrowserRouter></BrowserRouter>
); 

At this point we have a completely valid router set up. Render the const 'routes'.
ReactDOM.render(routes,document.getElementById('app'));

Open Route within BrowserRouter with path and component
const routes= ( 
    <BrowserRouter>
    <Route path='/' component={ExpenseDashboardPage}/>
    </BrowserRouter>
);

Whole point of using routeris to use multiple pages but BrowserRouter can have atmost one child
So when we want to use more than one Route, we should put all of them in a div tag:
const routes= ( 
    <BrowserRouter>
        <div>
            <Route path='/' component={ExpenseDashboardPage}/>
            <Route path='/create' component={AddExpensePage}/>
        </div>
    </BrowserRouter>
);

When we go to localhost/create we get 'Cannot GET /create'. This is because server was trying
to hit that page on our server. It was using the server side routing for the first page load.
We need to make a tweak to our web server configuration. We must send back index.html for all
routes. For this, we have to make a change in webpack.config
devServer:{
        contentBase:path.join(__dirname,'public'),
    }
to this:
devServer:{
        contentBase:path.join(__dirname,'public'),
        historyApiFallback: true
}
Save and restart the dev-server

When we reload localhost/create: we get both the components instead of only AddExpensePage.
That is because '/create' includes '/'. Use the prop 'exact' to correct this.

-------------------------------------------------------------------------------------------
78. Switch component

If we enter a url which doesnt exist, no error will be shown. It will just be a page with an
empty div. 
We can do this '<Route component={NotFoundPage}/>'  but this will show up on every page. Use
'switch' component to render it conditionally. Import switch, replace div with switch:
import { BrowserRouter, Route, Switch} from 'react-router-dom';
const routes= ( 
    <BrowserRouter>
        <Switch>
            <Route path='/' component={ExpenseDashboardPage} exact={true}/>
            <Route path='/create' component={AddExpensePage}/>
            <Route path='/edit' component={EditExpensePage}/>
            <Route path='/help' component={HelpExpensePage}/>
            <Route component={NotFoundPage}/>
        </Switch>
    </BrowserRouter>
);
Switch will go through the routes and stop when it finds a match.

-----------------------------------------------------------------------------------------

79. Linking between routes

when we manually type the url, we are going through full page refresh and end up communicating 
with the server. We need to set up links to avoid that. 
Import 'Link' from react-router-dom, use link instead of '<a></a>'
"<a href='/'>Go Home</a> " to "<Link to='/'>Go Home</Link>"

We want header to be displayed on every page: place switch within a div and call header outside
switch. We set up links in the header as well.

import Navlink, switch all links to Navlinks. Navlink has props that will add effects to the
links.
activeClassName: link takes up the class which is given as the value for this when we are on
the page of the link.
Use exact for Navlinks as well to avoid matching everything to home page url.

-------------------------------------------------------------------------------------------

80. Organising the routes

 src ==>routers ==> AppRouter.js
 take everything except imports and render from app.js to AppRouter.js, take the import for
 the components of react router too, and react

 take all the contents of routes and put it in AppRouter constant and export it as default.
 import it in app.js, and call it in the render in app.js

 take all the components out, put it into separate files and import it into the AppRouter.js file

 -----------------------------------------------------------------------------------------------

 81. Query String an Url parameters.

 React passes some props. To see what the props are we pass props to AddExpensePage and console.log 
 the props to see what they are.
 history: most of the properties are methods which allow us to manipulate the history. For eg. 
 redirect the user programmatically via js. 
 match: We are going to be using mostly the params object 
 location: contains inf about current url

 Go to create url on the browser tab and change it a little:
 http://localhost:8080/create
 to
 http://localhost:8080/create?query=rent&sort=date
 search value in location prop appears

 We can also populate the hash value:
 http://localhost:8080/create#contact-us This takes us to element with contact-us id
hash value in location prop appears

We have to figure out how to set dynamic urls. 
Open AppRouter.js. Change the current edit route:
 <Route path='/edit/' component={EditExpensePage}/>
 to
 <Route path='/edit/:id' component={EditExpensePage}/>

 Now if we put edit/99 for eg. match-->params will have an 'id:99'

 In the EditExpensePage put 
 <div>
   Editing the expense with the id of {props.match.params.id}
 </div>

 Now just '/edit' will give us 404. Remove edit from header. 

 -------------------------------------------------------------------------------------------------

 82. Portfolio App

 -------------------------------------------------------------------------------------------------

 83. Intro to redux

 ------------------------------------------------------------------------------------------------

84. Why Redux?

Issues we might run into if we continue to use component stae instead of redux:
In complex apps there is no clear parent component where we can store the state.
The components end up communicating a lot, which makes them dependant on each other and not reusable.

--------------------------------------------------------------------------------------------------

85. Setting up redux

playground-->redux-101.js
webpack.config-->module.exports-->entry: './src/playground/redux-101.js',

learn more: redux.js.org 

install: yarn add redux@[version] 
import createStore. createStore needs arguements. Funtion --> 1st arg,
use createStore to create and store. Store tracks the data in it.

store.getState(): returns current state of the obj

--------------------------------------------------------------------------------------------------

86. Dispatching Actions

Actions allow us to change redux store. Action is an object that gets sent to store. We have three 
actions increment, decrement, reset for count. 

For action we have to define the 'type' in the object. General convention : all uppercase char

dispatch: sets the action object to the store. Place the obj inside the parenthesis of dispatch method.

action is passed as the 2nd arg to createStore. 

Use if statements or switch case to perform each operation depending on action type.

The store function runs everytime dispatch is called.

-------------------------------------------------------------------------------------------------

87. Subscribing and dynamic actions

store.subscribe : pass a single funtion to it, get called every single time store changes

Return value from subscribe is a function we can call to unsubscribe.

We can provide data in the action object and use that in the store to make dynamic changes.

-------------------------------------------------------------------------------------------------

88. ES6 Object Destructuring, 89. Array Destructuring

playground--> Destructuring.js

--------------------------------------------------------------------------------------------------

90. Refactoring and Organising

using Destructuring in redux-101.js

action generators are functions that return action objects. Use action generator function inside
dispatch rather than returning an obj directly.
--------------------------------------------------------------------------------------------------

91. Reducers

reducers are pure functions i.e output is only determined by the input.
never change state or actions

playground-->redux-expensify.js

combineReducers : allow us to create multiple functions that allow us to define how a redux application
changes
-------------------------------------------------------------------------------------------------

92. Working with multiple reducers

split the reducer into two parts expense and filter with a default state for each.

used the combine reducer to put them together.
---------------------------------------------------------------------------------------------------

93. ES6 spread operators in reducers

set up action generators and dispatch actions.(addExpense, removeExpense )

npm uuid generates universally unique identifiers. 

Spread operator: 
current array - names: ['s', 'b', 't'];
[...names] --> ['s','b','t']
[...names,'c'] ---> ['s','b','t','c']
['a',...names,'c'] --> ['a','s','b','t','c']

------------------------------------------------------------------------------------------------

94. Spreading objects

plugin: babel object spread operator -->yarn add babel-plugin-transform-object-rest-spread

.babelrc --> plugins ; ["transform-object-rest-spread"]

spread operator on objects:
const person =  {
    name:'suhana',
    age:22
}

console.log({
    ...person,
    age:18, //overrides age
    location:'dubai'   
});

console.log({
    age:18,  //does not override age
    ...person,
    location:'dubai'
});

------------------------------------------------------------------------------------------------
95. wrapping up reducers

set up reducers for all filters
-------------------------------------------------------------------------------------------------

96.filtering redux data

getVisibleExpenses
used getVisibleExpenses in subscribe

--------------------------------------------------------------------------------------------------
97. sorting redux data

check arr.sort(sorting function)
--------------------------------------------------------------------------------------------------

Section 11:

99. Organising Redux:
src --> reducers , src --> actions , src --> source, 
basically put everything in its own files and import from app.js

--------------------------------------------------------------------------------------------------

100. Higher Order Component:

HOC: a component that renders another component.
Goal of HOC is to reuse code, remder hijacking, prop manipulation, abstract state.
--------------------------------------------------------------------------------------------------

101. Connecting store and component with react-redux:

yarn add react-redux
provider, connect 

-------------------------------------------------------------------------------------------------
102. Rendered Individual expenses on screen

ExpenseList, ExpenseListItem
-------------------------------------------------------------------------------------------------
103. Controlled input for filters

set text filter from input -- ExpenseListFilter
-------------------------------------------------------------------------------------------------
104. Dropdown for sortby

set text filter based on the selected sortby from dropdown -- ExpenseListFilter
-------------------------------------------------------------------------------------------------
105. Add inputs for description, amount, notes in create expense-- ExpenseForm
-------------------------------------------------------------------------------------------------
106. Date picker to the form 

ExpenseForm

moment.js, airbnb

yarn add moment@2.18.1 react-dates@12.7.0 react-addons-shallow-compare@15.6.0



