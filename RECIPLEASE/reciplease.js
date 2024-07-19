//console.log(`Hello`)
//window.alert(`This is an alert`)
//document.getElementById("").textContent = ""
//let x = 25;
//let y = 28;
//let sum = y-x;
//let isStudent = true;
//console.log(`You are ${x} years old and will by ${y} years old in ${sum} years`);
//typeof() returns data type;


const incButton = document.getElementById("search_button")
const countLabel = document.getElementById("count_label")

let count = 0
let recipe_list = []

let ing1 = document.getElementById('ing1')
let ing2 = document.getElementById("ing2")
let ing3 = document.getElementById("ing3")
let ing4 = document.getElementById("ing4")
let ing5 = document.getElementById("ing5")

const ing_list = [ing1, ing2, ing3, ing4, ing5]

const ing_display = () => {ing_list.map((elem, index) => {
  if (recipe_list[recipe_list.length-index-1]){
    elem.innerText = recipe_list[recipe_list.length-index-1].name}
})}
//console.log(result)

ing_display()

// INGREDIENT OBJECT

const ingredient = (name) => {
  return{
    // Properties
    name: name,
    quantity: 'None',
    number: 'None'
  }
}

const get_ingredient = ()=>{
  if (document.getElementById("searchbar").value != ("")){
    // Save ingredient name into variable
    let ing_name = document.getElementById("searchbar").value
    console.log(ing_name)
    // Create new ingredient object with ingredient name and add to recipe list
    let newObj = ingredient(ing_name)
    recipe_list.push(newObj)
    // Ingredient count increases by 1 every time new ingredient is added
    count+=1;
    // Clear Search-Bar Value after inputted
    document.getElementById("searchbar").value = "";
    console.log(recipe_list)
    console.log(recipe_list[count-1].name)
    console.log(recipe_list.indexOf())
  }
  countLabel.textContent = count
}
// incButton.onmouseover = () => {incButton.style.backgroundColor = 'blue'}
// incButton.onmouseout = () => {incButton.style.backgroundColor = 'red'}

incButton.onclick = () => {
  get_ingredient();
  ing_display();
}

searchbar.addEventListener("keypress", (event)=>{
  if (event.key == "Enter"){
    get_ingredient();
    ing_display();
  }
});

/*document.addEventListener('DOMContentLoaded', () => {
  fetchFilterRecipes(ing_list)
})
*/
const next = document.getElementById("next_ing")

if (count>=5){
  var next_button = document.createElement("img");
  next_button.src = 'Next_Arrow'
  next_button.setAttribute("height", "768");
  next_button.setAttribute("width", "1024");
  next_button.setAttribute("alt", "Flower");
  next.appendChild(next_button)
}

/*
document.getElementById("search_button").onclick = function(){
  ingredient = document.getElementById("searchbar").value;
}

*/
document.addEventListener('DOMContentLoaded', () => {
  // Function to fetch recipes and filter them by ingredients
  function fetchAndFilterRecipes(ingredients) {
    fetch('recipeitems-latest.json')
      .then(response => response.json())
      .then(recipes => {
        // Filter recipes based on ingredients
        const filteredRecipes = recipes.filter(recipe => {
          // Check if the recipe contains all specified ingredients
          return ingredients.every(ingredient =>
            recipe.ingredients.toLowerCase().includes(ingredient.name.toLowerCase().trim())
          );
        });

        // Display the filtered recipes
        const app = document.getElementById('app');
        app.innerHTML = ''; // Clear previous results
        filteredRecipes.forEach(recipe => {
          const div = document.createElement('div');
          div.innerHTML = `<h2>${recipe.title}</h2><p>${recipe.ingredients}</p><a href="${recipe.href}">View Recipe</a>`;
          app.appendChild(div);
        });

        if (filteredRecipes.length === 0) {
          app.innerHTML = '<p>No recipes found for the given ingredients.</p>';
        }
      })
      .catch(error => console.error('Error fetching JSON:', error));
  }

  // Event listener for the filter button
  document.getElementById('filterButton').addEventListener('click', () => {
    /*const ingredientsInput = document.getElementById('ingredients').value;
    const ingredients = ingredientsInput.split(','); // Split input into an array of ingredients
    */
   fetchAndFilterRecipes(recipe_list);
  });
});
