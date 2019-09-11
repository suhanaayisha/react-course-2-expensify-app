console.log('App.js is running')

// JSX - Javascript XML
const app={
    title:"Indecision App",
    subtitle:"Put your life in the hands of a computer",
    options:[]
};
const onFormSubmit= (e) =>{
    e.preventDefault();

    console.log('form submitted')

    const option= e.target.elements.option.value;

    if(option){
        app.options.push(option);
        e.target.elements.option.value="";
        renderApp();
    }
}

const removeAll= (e) =>{

    app.options=[];
    renderApp();

};
 const onMakeDecision = (e)=>{
     const random_num= Math.floor(Math.random() * app.options.length);
     const option = app.options[random_num];
     alert(option);
 }
const appRoot = document.getElementById('app');

const renderApp = () => {
const template = (
    <div>
        <h1>{app.title}</h1>
        {app.subtitle && <p>{app.subtitle}</p>}
        <p>{(app.options.length >0 )? 'Here are your options' : 'No options'}</p> 
       <button disabled={app.options.length===0} onClick={onMakeDecision}>What should I do?</button>
        <ol>
        {
            app.options.map((option)=>{
                return <li key={option}>{option}</li>
            })
        }
        </ol>
        <form onSubmit={onFormSubmit}>
        <input type="text" name="option"/>
        <button>Add Option</button>
        <button onClick={removeAll}>Remove All</button>
        </form>
    </div>
);

ReactDOM.render(template, appRoot);
}

renderApp();