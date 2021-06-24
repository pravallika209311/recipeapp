import "./App.css";
import {useEffect ,useState,useRef} from 'react';
function App() {
   const [ingredientList,updateIngredientList]= useState([]);
   const inputRef = useRef(null);
  const API_KEY ="8569e1b422938159708c866456d4520d";
const APP_ID = "644a0e1c";
const search=()=>{
  console.log("input ref" ,inputRef.current.value)
   searchForRecipie(inputRef.current.value);
};
const searchForRecipie=(query)=>{
  let url = `search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`;
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

}
useEffect(() => {
searchForRecipie('chicken');
},[]);

  return ( 
    <div className="App">
      <header className="App-header" >
        <div>
          <input ref={inputRef} placeholder="Search for recipe"/>
          <button onClick={search}>Search</button>
          </div>
        <div className="wrapper">
       {ingredientList.map((item,index)=>{
         return (
           <div className="Ingredient" key={index}>
            <span>{item.recipe.label}</span>

            <img src={item.recipe.image} alt=".."/>
            <div className="Steps">
            {item.recipe.ingredientLines.map((step,i)=>{
           return  <p key={i}>{step}</p>
            })}
            </div>
           </div>
         )
         
       }
       )}
       </div>
      </header>
    </div>
  ); 
}

export default App;
 