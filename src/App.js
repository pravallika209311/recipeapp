import "./App.css";
import {useEffect ,useState} from 'react';
function App() {
   const [ingredientList,updateIngredientList]= useState([]);
  const API_KEY ="8569e1b422938159708c866456d4520d";
const APP_ID = "644a0e1c"; 

useEffect(() => {
  let url = `search?q=desserts&app_id=${APP_ID}&app_key=${API_KEY}`;
  fetch(url)
  .then(response=>{
  console.log(response);
  return response.json();
  })  
  .then(res=>{
    console.log(res.hits,res)
   updateIngredientList(res.hits);
  })
  .catch(err=> console.log("error",err) );  
},[]);

  return ( 
    <div className="App">
      <header className="App-header">
        <div className="wrapper"></div>
       {ingredientList.map((item)=>{
         return (
           <div className="Ingredient">
            <span>{item.recipe.label}</span>
            <img src={item.recipe.image}/>
            {item.recipe.ingredientLines.map(step=>{
           return  <p>{step}</p>
            })}
           </div>
         )
       })}
      </header>
    </div>
  ); 
}

export default App;
 