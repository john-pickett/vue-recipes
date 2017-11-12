<template>
    <div>
        <h4>Menu Plan</h4>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex md6 v-for="(value, key) in days">
                    <v-card class="ma-2 pa-2">
                        <draggable :id="key" v-model="recipes" :options="{group:'recipes'}" @start="drag=true" 
                            @end="drag=false" @add="newRecipe">
                            <v-card-title class="headline"> 
                                {{ capLetter(key) }}
                            </v-card-title>
                        </draggable>
                        <v-card v-for="recipe in value">
                            <v-card-title class="headline"> 
                                {{ recipe[0].title }}
                            </v-card-title>
                        </v-card>
                    </v-card>
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
                recipes: [],
                days: {
                    sunday: [],
                    monday: [],
                    tuesday: [],
                    wednesday: [],
                    thursday: [],
                    friday: [],
                    saturday: []
                }
            }
        },
        components: {
            draggable
        },
        created () {
            eventBus.$on('sendingRecipe', recipeData => {
                // Ex: {"day":"thursday","recipe":{"id":4,"title":"Sesame Pork Noodle"}}
                this.days[recipeData.day].push(recipeData.recipe)
            });
        },
        methods: {
            removeRecipe: function (id) {
                this.recipes = this.recipes.filter (function (recipe) {
                    return recipe.id != id;
                });
            },
            capLetter: function (input) {
                return input.charAt(0).toUpperCase() + input.slice(1);
            },
            // this is called when a new recipe is dropped into a day
            newRecipe: function (event) {
                // console.log('newRecipe ' + event.to.id);
                eventBus.$emit('daySelected', event.to.id);
            }
        }
    }
</script>

