const express = require('express')
const recipe = require('./recipes.middleware')
const app = express()
app.use(express.json())

let initialRecipe = [
    {
        name: 'Spaghetti Carbonara',
        description: 'A classic Italian pasta dish.',
        preparationTime: '15 minutes',
        cookingTime: '15',
        imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/carbonara-index-6476367f40c39.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*',
        country: "India",
        veg: true,
        id: 1
    }
]

app.get("/", (req, res) => {
    res.send("welcome to the recipe api")
})

app.get("/recipe/all", (req, res) => {
    res.json(initialRecipe);
})

app.get("/index", (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get("/add", (req, res) => {
    res.sendFile(__dirname + '/recipe.html');
})

app.post('/recipe/add',recipe, (req, res) => {
    const newRecipe = {
        name: req.body.name,
        description: req.body.description,
        preparationTime: req.body.preparationTime,
        cookingTime: req.body.cookingTime,
        imageUrl: req.body.imageUrl,
        country: req.body.country,
        veg: req.body.veg,
        id: initialRecipe.length + 1
    }
    initialRecipe.push(newRecipe);
    res.send(initialRecipe);
});

//PATCH Route

app.patch('/recipe/update/:id', (req, res) => {
    const { id } = req.params;
    const updatedRecipe = req.body;
    const updatedRecipes = initialRecipe.map(recipe => {
        if (recipe.id === parseInt(id)) {
            return { ...recipe, ...updatedRecipe };
        }
        return recipe;
    });
    initialRecipe = updatedRecipes;
    res.json(initialRecipe);
});

//DELETE Route 

app.delete("/recipe/delete/:id", (req, res) => {
    let { id } = req.params
    let updated = initialRecipe.filter(recipes => recipes.id != id)
    res.send(updated)
})

app.post("/", async (req, res) => {
    let data = await initialRecipe.create(req.body)
    res.status(201).send(data)
})


//Query Params Filter

app.get('/recipe/filter', (req, res) => {
    let filteredRecipes = initialRecipe;

    const isVeg = req.query.veg === 'true';
    const country = req.query.country;
    const sort = req.query.sort;

    if (isVeg == true) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.veg === isVeg);
    }
    else if (isVeg !== undefined) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.veg === isVeg);
    }

    if (country) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.country.toLowerCase() === country.toLowerCase());
    }

    if (sort) {
        filteredRecipes.sort((a, b) => {
            if (sort === 'lth') {
                return a.name.length - b.name.length;
            }
            else if (sort === 'htl') {
                return a.name.length - b.name.length;
            }
        });
    }

    res.json(filteredRecipes);
});

app.listen(8090, () => {
    console.log("listen port 8090");
})
