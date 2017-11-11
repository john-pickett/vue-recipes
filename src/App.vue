<template>
  <v-app id="inspire">
    <v-navigation-drawer
      persistent
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Recipes</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-content>
        <v-container fluid fill-height>
          <v-layout>
            <v-card id="recipes-card" class="ma-2 pa-2" height="100%">
              <recipecomp></recipecomp>
            </v-card>
            <v-card id="menu-plan-card" class="ma-2 pa-2" height="100%">
              <menuplan></menuplan>
            </v-card>
          </v-layout>
        </v-container>
      </v-content>
    </main>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import draggable from 'vuedraggable'
  import Recipes from '../Components/Recipes.vue'
  import MenuPlan from '../Components/MenuPlan.vue'

  export default {
    data: () => ({
      drawer: false
    }),
    props: {
      source: String
    },
    components: {
      draggable,
      recipecomp: Recipes,
      menuplan: MenuPlan
  },
  }
</script>

<style>
  #recipes-card {
    min-height: 600px;
    width: 25%;
  }

   #menu-plan-card {
     min-height: 600px;
     width: 75%;
   }
</style>


