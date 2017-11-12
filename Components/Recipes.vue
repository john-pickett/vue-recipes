<template>
    <div>
        <v-card>
            <v-btn absolute dark fab top right color="pink"
                @click=toggleNewRecipeCard()>
                <v-icon>add</v-icon>
            </v-btn>
            <v-card-text v-show="newRecipeCard">
                <h4>New Recipe</h4>
                <v-text-field
                    id="recipe-input"
                    name="recipe-input"
                    label="Recipe name"
                ></v-text-field>
                <v-btn color="primary" @click=inputRecipe()>Add Recipe</v-btn>
            </v-card-text>
        </v-card>
        <h4>Recipes</h4>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex md6 v-for="(recipe, key) in recipes">
                    <draggable :id="key" v-model="recipes" :options="{group: { name:'recipes', pull:'clone', put:'false'}}" @start="drag=true" 
                        @end="drag=false" :move="chooseRecipe">
                        <v-card class="ma-2 pa-2">
                        <v-card-title>
                            <div class="headline">{{ recipe.title }}</div>
                        </v-card-title>
                        </v-card>
                    </draggable>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import { eventBus } from '../src/main.js';
    import draggable from 'vuedraggable';

    export default {
        data: () => {
            return {
                recipes: [
                    { id: 0, title: 'Chicken Tacos' },
                    { id: 1, title: 'Thai Larb' },
                    { id: 2, title: 'Texas Spaghetti' },
                    { id: 3, title: 'Sesame Pork Noodle' },
                    { id: 4, title: 'Rosemary Chicken' },
                    { id: 5, title: 'Asian Fish Dish' },
                    { id: 6, title: 'Spaghetti and Meatballs' },
                    { id: 7, title: 'Nachos' },
                    { id: 8, title: 'Chicken Enchiladas' },
                    { id: 9, title: 'Asian Beef Stir-fry' }
                ],
                targetRecipe: '',
                targetDay: '',
                newRecipeCard: false
            }
        },
        components: {
            draggable
        },
        created () {
            eventBus.$on('daySelected', day => {
                this.targetDay = day
                // console.log('daySelected ' + this.targetRecipe)
                this.sendRecipeData(this.targetRecipe);
            });
        },
        methods: {
            // this starts the recipe drag and drop process
            chooseRecipe: function (event) {
                // console.log('chooseRecipe ' + event.from.id);
                this.targetRecipe = event.from.id;
            },
            sendRecipeData: function (id) {
                // console.log('id ' + id)
                var myRecipe = this.recipes.filter(function (recipe) {
                    return recipe.id == id;
                });
                var recipeData = {
                    day: this.targetDay,
                    recipe: myRecipe
                }
                eventBus.$emit('sendingRecipe', recipeData);
            },
            inputRecipe: function () {
                var elem = document.getElementById('recipe-input');
                var recipeId = this.recipes.length;
                console.log("id: " + recipeId)
                console.log("value: " + elem.value);
                this.recipes.push({ id:recipeId, title: elem.value });
                
            },
            toggleNewRecipeCard: function () {
                console.log('click')
                this.newRecipeCard = !this.newRecipeCard;
            }
        }
    }
</script>

<style>
 
</style>
