/// <reference types="../@types/jquery" />

$("#Search").on("click",()=>{
    $("#searchContainer").removeClass("d-none")
    $("#display").addClass("d-none")
   })

$("#ContactUs").on("click",()=>{
    $(".ContactUs").removeClass("d-none")
    $("#display").addClass("d-none")
   })




   
////////////////////////

class ClosNav{
    constructor(){

     


        $(".nav-header .openIcon").on("click",()=>{

            $(".nav-info ").animate({width:"250px"},500)
            
            $(".openIcon ").addClass("d-none")
            $(".closIcon ").removeClass("d-none").on("click",()=>{
                $(".nav-info ").animate({width:"0"},500)
                $(".openIcon ").removeClass("d-none")
                $(".closIcon ").addClass("d-none")
            })
        })


       $(".ClosNav").on("click",()=>{
        $(".nav-info ").animate({width:"0"},500)
        $(".openIcon ").removeClass("d-none")
        $(".closIcon ").addClass("d-none")
       })
    }
   
}
new ClosNav();

/////////////////////////

class Home{
    constructor(){
        
       
    }

  async  getMeals(){
    $(".loading").removeClass("d-none")
    var mealsList=[];
        var apiData =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    
        var response =await apiData.json()
        
        mealsList= response;
        $(".loading").addClass("d-none")
        this.displaymeals(mealsList.meals)
     
    }

    displaymeals(data) {
        var displaymeals = "";
    
        for (let i = 0; i < data.length; i++) {
            displaymeals += `
            <div class="col-md-3">
                    <div id="${data[i].idMeal}" class=" details-meal meal position-relative overflow-hidden rounded-2 ">
                        <img id="${data[i].idMeal}" class="w-100" src="${data[i].strMealThumb}" alt="meal" >
                        <div id="${data[i].idMeal}" class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                            <h3 id="${data[i].idMeal}" >${data[i].strMeal}</h3>
                        </div>
                    </div>
            </div>
            `
        }
    
       document.getElementById("display").innerHTML= displaymeals;

       $(".details-meal").on("click",(details)=>{
        this.getDetails(details.target.id)
        console.log(details.target.id);
        
       })
    }

   
    async  getDetails(mealID){
        $(".loading").removeClass("d-none")
    var detailsList=[];
        var apiData =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    
        var response =await apiData.json()
        
        detailsList= response;
        $(".loading").addClass("d-none")
        this.displayDetails(detailsList.meals)

      
    }

    displayDetails(data){
        var display = "";
        for (let i = 0; i <data.length; i++) {
           display += ` 
          
<div class="col-md-4">
<img class="w-100 rounded-3" src="${data[i].strMealThumb}" alt="details">
    <h2>${data[i].strMeal}</h2>
</div>

<div class="col-md-8">
                <h2>Instructions</h2>
                <p>${data[i].strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${data[i].strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${data[i].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure1} ${data[i].strIngredient1}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure2} ${data[i].strIngredient2}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure3} ${data[i].strIngredient3}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure4} ${data[i].strIngredient4}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure5} ${data[i].strIngredient5}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure6} ${data[i].strIngredient6}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure7} ${data[i].strIngredient7}</li>
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                <li class="alert alert-danger m-2 p-1">${data[i].strTags} </li>
                </ul>

                <a target="_blank" href="${data[i].strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${data[i].strYoutube}" class="btn btn-danger">Youtube</a>
            </div>

           `;
        
        }
    document.getElementById("display").innerHTML=display;
    }

}
var home= new Home();
home.getMeals()

////////////////////////


class Category{
    constructor(){
        $("#Category").on("click",()=>{
            this.getCategory();
        })


    }

    async getCategory(){
        
        $(".loading").removeClass("d-none")
        var dataList=[];
        var apiData =await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    
        var response =await apiData.json()
        
        dataList= response;
        $(".loading").addClass("d-none")

        this.displayCategories(dataList.categories)
        $(".Category").on("click",(Category)=>{
      
          this.getMealsByCategory(Category.target.id)
        })
    }
   
    displayCategories(data) {
        var displayCat = "";
    
        for (let i = 0; i < data.length; i++) {
            displayCat += `
            <div class="col-md-3">
                    <div class="meal Category position-relative overflow-hidden rounded-2 "  >
                        <img class="w-100" src="${data[i].strCategoryThumb}" alt="CategoryMeals" >
                        <div class="meal-layer position-absolute text-center text-black p-2">
                            <h3 id="${data[i].strCategory}"> ${data[i].strCategory}</h3>
                            <p  id="${data[i].strCategory}" class="mb-5">${data[i].strCategoryDescription.slice(0,120)}</p>
                        </div>
                    </div>
            </div>
            `
        }
    
       document.getElementById("display").innerHTML= displayCat;
    }

    async getMealsByCategory(category){
     $(".loading").removeClass("d-none")
    var mealList=[];
        var apiMeals =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    
        var response =await apiMeals.json()
        
        mealList= response.meals;
        $(".loading").addClass("d-none")
       this.displayMeal(mealList)
    
    }

    displayMeal(data){
        var display = "";
        for (let i = 0; i <data.length; i++) {
           display += `<div class="col-md-3">
           <div id="${data[i].idMeal}" class="meal details-meal position-relative overflow-hidden rounded-2 ">
               <img id="${data[i].idMeal}" class="w-100" src="${data[i].strMealThumb}" alt="meal" >
               <div id="${data[i].idMeal}" class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                   <h3 id="${data[i].idMeal}" >${data[i].strMeal}</h3>
               </div>
           </div>
       </div>`;
        
        }
    document.getElementById("display").innerHTML=display;

    $(".details-meal").on("click",(details)=>{
        this.getDetails(details.target.id)
        console.log(details.target.id);
        
       })
    }

    async  getDetails(mealID){
        $(".loading").removeClass("d-none")
    var detailsList=[];
        var apiData =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    
        var response =await apiData.json()
        
        detailsList= response;
        $(".loading").addClass("d-none")
        this.displayDetails(detailsList.meals)

      
    }

    displayDetails(data){
        var display = "";
        for (let i = 0; i <data.length; i++) {
           display += ` 
          
<div class="col-md-4">
<img class="w-100 rounded-3" src="${data[i].strMealThumb}" alt="details">
    <h2>${data[i].strMeal}</h2>
</div>

<div class="col-md-8">
                <h2>Instructions</h2>
                <p>${data[i].strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${data[i].strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${data[i].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure1} ${data[i].strIngredient1}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure2} ${data[i].strIngredient2}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure3} ${data[i].strIngredient3}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure4} ${data[i].strIngredient4}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure5} ${data[i].strIngredient5}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure6} ${data[i].strIngredient6}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure7} ${data[i].strIngredient7}</li>
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                <li class="alert alert-danger m-2 p-1">${data[i].strTags} </li>
                </ul>

                <a target="_blank" href="${data[i].strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${data[i].strYoutube}" class="btn btn-danger">Youtube</a>
            </div>

           `;
        
        }
    document.getElementById("display").innerHTML=display;
    }

}

new Category();


///////////////////////
class Area{
    constructor(){
        $("#Area").on("click",()=>{
            this.getArea();
        })

    }

    async getArea(){
        
        $(".loading").removeClass("d-none")
                var areaList=[];
        var apiData =await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    
        var response =await apiData.json()
        
        areaList= response;
        $(".loading").addClass("d-none")
        // console.log(areaList.meals);
        this.displayArea(areaList.meals)

       

        $(".Area").on("click",(Area)=>{
        //   console.log(Area.target.id);
          this.getMealsByArea(Area.target.id)
        })
    }

    displayArea(data){
        var display = "";
        for (let i = 0; i <data.length; i++) {
           display += ` <div class="col-md-3">
           <div  class=" Area rounded-2 text-center ">
                   <i id="${data[i].strArea}"  class="fa-solid fa-house-laptop fa-4x"></i>
                   <h3  id="${data[i].strArea}">${data[i].strArea}</h3>
           </div>
    </div>`;
        
        }
    document.getElementById("display").innerHTML=display;
    }

    async getMealsByArea(area){
        $(".loading").removeClass("d-none")   
         var mealList=[];
        var apiMeals =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    
        var response =await apiMeals.json()
        
        mealList= response.meals;
        $(".loading").addClass("d-none")
       this.displayMealByArea(mealList.slice(0, 20))
    // console.log(mealList);
    }

    displayMealByArea(data){
        var display = "";
        for (let i = 0; i <data.length; i++) {
           display += `<div class="col-md-3">
           <div id="${data[i].idMeal}" class="meal details-meal  position-relative overflow-hidden rounded-2 ">
               <img id="${data[i].idMeal}" class="w-100" src="${data[i].strMealThumb}" alt="meal" >
               <div id="${data[i].idMeal}" class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                   <h3 id="${data[i].idMeal}" >${data[i].strMeal}</h3>
               </div>
           </div>
       </div>`;
        
        }
    document.getElementById("display").innerHTML=display;

    
    $(".details-meal").on("click",(details)=>{
        this.getDetails(details.target.id)
        console.log(details.target.id);
        
       })
    }

    async  getDetails(mealID){
        $(".loading").removeClass("d-none");
            var detailsList=[];
        var apiData =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    
        var response =await apiData.json()
        
        detailsList= response;
        $(".loading").addClass("d-none")
        this.displayDetails(detailsList.meals)

      
    }

    displayDetails(data){
        var display = "";
        for (let i = 0; i <data.length; i++) {
           display += ` 
          
<div class="col-md-4">
<img class="w-100 rounded-3" src="${data[i].strMealThumb}" alt="details">
    <h2>${data[i].strMeal}</h2>
</div>

<div class="col-md-8">
                <h2>Instructions</h2>
                <p>${data[i].strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${data[i].strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${data[i].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure1} ${data[i].strIngredient1}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure2} ${data[i].strIngredient2}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure3} ${data[i].strIngredient3}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure4} ${data[i].strIngredient4}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure5} ${data[i].strIngredient5}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure6} ${data[i].strIngredient6}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure7} ${data[i].strIngredient7}</li>
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                <li class="alert alert-danger m-2 p-1">${data[i].strTags} </li>
                </ul>

                <a target="_blank" href="${data[i].strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${data[i].strYoutube}" class="btn btn-danger">Youtube</a>
            </div>

           `;
        
        }
    document.getElementById("display").innerHTML=display;
    }
}

new Area();

/////////////////////////////////
class Ingredients{
    constructor(){
        $("#Ingredients").on("click",()=>{
            this.getIngredients();
        })
    }

    async getIngredients(){
      
        $(".loading").removeClass("d-none")    
            var  ingredientsList=[];
        var apiData =await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    
        var response =await apiData.json()
        
        ingredientsList= response;

        $(".loading").addClass("d-none")
        // console.log(ingredientsList.meals);
        this.displayIngredients(ingredientsList.meals.slice(0, 20))

        $(".Ingredients").on("click",(Ingredients)=>{
            //   console.log(Ingredients.target.id);
              this.getMealsByIngredients(Ingredients.target.id)
            })
    }
    
    displayIngredients(data){
        var display = "";
        for (let i = 0; i <data.length; i++) {
           display += ` 
           <div class="col-md-3">
                          <div  class="Ingredients rounded-2 text-center ">
                                  <i  id="${data[i].strIngredient}" class="fa-solid fa-drumstick-bite fa-4x"></i>
                                  <h3 id="${data[i].strIngredient}">${data[i].strIngredient}</h3>
                                  <p  id="${data[i].strIngredient}">${data[i].strDescription.slice(0, 120)}</p>
                          </div>
                  </div> `;
        
        }
    document.getElementById("display").innerHTML=display;
    }

    async getMealsByIngredients(ingredients){
        $(".loading").removeClass("d-none");
            var mealList=[];
        var apiMeals =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    
        var response =await apiMeals.json()
        
        mealList= response.meals;
        $(".loading").addClass("d-none")
       this.displayMealByIngredients(mealList.slice(0, 20))
    // console.log(mealList);
    }

    displayMealByIngredients(data){
        var display = "";
        for (let i = 0; i <data.length; i++) {
           display += `<div class="col-md-3">
           <div id="${data[i].idMeal}" class="meal details-meal position-relative overflow-hidden rounded-2 ">
               <img id="${data[i].idMeal}" class="w-100" src="${data[i].strMealThumb}" alt="meal" >
               <div  id="${data[i].idMeal}" class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                   <h3 id="${data[i].idMeal}" >${data[i].strMeal}</h3>
               </div>
           </div>
       </div>`;
        
        }
    document.getElementById("display").innerHTML=display;
    $(".details-meal").on("click",(details)=>{
        this.getDetails(details.target.id)
        console.log(details.target.id);
        
       })
    }

    async  getDetails(mealID){
        $(".loading").removeClass("d-none");
            var detailsList=[];
        var apiData =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    
        var response =await apiData.json()
        
        detailsList= response;
        $(".loading").addClass("d-none");
        this.displayDetails(detailsList.meals);

      
    }

    displayDetails(data){
        var display = "";
        for (let i = 0; i <data.length; i++) {
           display += ` 
          
<div class="col-md-4">
<img class="w-100 rounded-3" src="${data[i].strMealThumb}" alt="details">
    <h2>${data[i].strMeal}</h2>
</div>

<div class="col-md-8">
                <h2>Instructions</h2>
                <p>${data[i].strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${data[i].strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${data[i].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure1} ${data[i].strIngredient1}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure2} ${data[i].strIngredient2}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure3} ${data[i].strIngredient3}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure4} ${data[i].strIngredient4}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure5} ${data[i].strIngredient5}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure6} ${data[i].strIngredient6}</li>
                    <li class="alert alert-info m-2 p-1">${data[i].strMeasure7} ${data[i].strIngredient7}</li>
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                <li class="alert alert-danger m-2 p-1">${data[i].strTags} </li>
                </ul>

                <a target="_blank" href="${data[i].strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${data[i].strYoutube}" class="btn btn-danger">Youtube</a>
            </div>

           `;
        
        }
    document.getElementById("display").innerHTML=display;
    }
}
 
new Ingredients();

////////////////////////////

   class Search{
    constructor(){
       
    }

    async searchByName(term) {

        $(".loading").removeClass("d-none")
    
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        response = await response.json()
        $(".loading").add("d-none")
        
       if (response.meals) {
        this.displaySearchMeal(response.meals)
       }
    }


    async searchByFLetter(term) {
   
    
        $(".loading").removeClass("d-none")
    
        term == "" ? term = "a" : "";
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
        response = await response.json()
    
        $(".loading").add("d-none")
        
       if (response.meals) {
        this.displaySearchMeal(response.meals)
       }
    
    }

    displaySearchMeal(data) {
        var displaymeals = "";
        
        for (let i = 0; i < data.length; i++) {
            displaymeals += `
            <div class="col-md-3">
                    <div id="${data[i].idMeal}" class=" details-meal meal position-relative overflow-hidden rounded-2 ">
                        <img id="${data[i].idMeal}" class="w-100" src="${data[i].strMealThumb}" alt="meal" >
                        <div id="${data[i].idMeal}" class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                            <h3 id="${data[i].idMeal}" >${data[i].strMeal}</h3>
                        </div>
                    </div>
            </div>
            `
        }
    
       document.getElementById("display").innerHTML= displaymeals;
    
       $(".details-meal").on("click",(details)=>{
        this.getDetails(details.target.id)
        console.log(details.target.id);
        
       })
    }
    
   }
new Search()

// ================================================


class Validation{
    constructor(){
      
    }

    validationInput(input,msgID) {

        var regex ={
            nameInput:/^[a-zA-Z ]+$/,
            emailInput:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            phoneInput:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
            ageInput:/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
            passwordInput:/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,
            passwordInput:/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,

        }
        var text=input.value;
        var regex =/^[A-Z][a-z]$/;
        var msg= document.getElementById(msgID);
    
        if (regex[input.id].test(text)== true) {
            input.classList.add("is-valid");
            input.classList.remove("is-invalid");
            msg.classList.add("d-none");
            return true;
            }
            else{
                input.classList.remove("is-valid");
                input.classList.add("is-invalid");
                msg.classList.remove("d-none");
    
                return false ;
            }
    }
}

var Valid=new Validation();

$(".validation").on("input",()=>{
    Valid.validationInput("nameInput","nameAlert");
    Valid.validationInput("emailInput","emailAlert");
    Valid.validationInput("phoneInput","phoneAlert");
    Valid.validationInput("ageInput","ageAlert");
    Valid.validationInput("passwordInput","passwordAlert");
})

