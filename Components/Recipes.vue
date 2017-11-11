<template>
    <div>
        <h4>Recipes</h4>
        <v-list class="pa-3">
            <div v-for="(recipe, key) in recipes">
            <draggable :id="key" v-model="recipes" :options="{group: { name:'recipes', pull:'clone', put:'false'}}" @start="drag=true" 
                @end="drag=false" :move="chooseRecipe">
                
                <v-card class="ma-2 pa-2">
                <v-card-title>
                    <div class="headline">{{ recipe.title }}</div>
                </v-card-title>
                </v-card>
               
            </draggable>
            </div>
        </v-list>
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
                targetDay: ''
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
            }
        }
    }
</script>

<style>
 
</style>
