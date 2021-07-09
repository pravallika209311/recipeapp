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
   inputRef.current.value="";
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
searchForRecipie('icecream');
},[]);

  return ( 
    <div className="App">
      <header className="App-header" >
        <div>
          <input className="InputWrapper" ref={inputRef} placeholder="Search for recipe"/>
          <button  className="Inputbutton" onClick={search}>Search</button>
          </div>
        <div className="wrapper">
       {ingredientList.map(({recipe})=>{
         const {label,image,ingredientLines}=recipe;
         return (
           <div className="Ingredient" key={label}>
            <span>{label}</span>
            <img src={image} alt=".."/>
            <div className="Steps">
            {ingredientLines.map((step,index)=>{
           return  <p key={index}>{step}</p>
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
 