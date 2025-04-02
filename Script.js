const searchbtn=document.querySelector(".searchbtn");
const searchbox=document.querySelector(".searchbox");
const recipecontainer=document.querySelector(".recipe-container");
 const recipedetailscontent =document.querySelector(".recipe-details-content")
 const recipeclosebtn=document.querySelector(".recipe-class-btn")

//function to get recipes

const fetchrecipe = async(query) =>{
    recipecontainer.innerHTML="<h2>fetching recipe..</h2>";
   try{
    const data = await  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    ;
    
    const response =  await data.json();
  //  console.log(response);
 recipecontainer.innerHTML="";
   response.meals.forEach(meal => {
    const recipeDiv =document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `
    <img src="${meal.strMealThumb}">
   <strong> <h3>${meal.strMeal}</h3></strong>
    <p>${meal.srtArea}</p>
     <p>${meal.srtCategory}</p>

    `
    const button = document.createElement('button');
    button.textContent="View Recipe";
    recipeDiv.appendChild(button);

  //  Adding EventListener to recipe button
  button.addEventListener('click',()=>{
    openrecipePopup(meal);
  })
       recipecontainer.appendChild(recipeDiv);
   });
}catch(error){
    recipecontainer.innerHTML="<h2>Error in  Fetching recipe..</h2>";
    
}
}

//indegrients and measurement
const fetchIngredients=(meal) =>{
let ingredientsList = "";
for(let i=1; i<=20; i++){
    const ingredient = meal[`strIngredient${i}`];
    if(ingredient){
        const measure= meal[`strMeasure${i}`];
        ingredientsList +=`<li>${measure} ${ingredient}</li>`
    }
    else{
        break;
    }
}
return ingredientsList;
}
const openrecipePopup =(meal) =>{
    recipedetailscontent.innerHTML =`
    <h2 class="recipeName">${meal.strMeal}</h2>
   <h3>Ingredents:</h3>
   <ul  class="ingredientList" >${fetchIngredients(meal)}</ul>
   <div>
       <h3>Instructions:</h3>
       <p class="recipeinstructions">${meal.strInstructions}</p>
   </div>
   
  
    `
    recipedetailscontent.parentElement.style.display="block";

}

recipeclosebtn.addEventListener('click' ,()=>{
    recipedetailscontent.parentElement.style.display="none";
})
searchbtn.addEventListener('click', (e)=> {
    e.preventDefault();
    const searchInput = searchbox.value.trim();
    if(!searchInput){
recipecontainer.innerHTML=`<h2>Type The Meal You Want To Search..</h2>`;
return;
    }
    fetchrecipe(searchInput);
   
});