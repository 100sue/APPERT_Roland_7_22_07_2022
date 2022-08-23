<script>
import Signup from "./components/Signup.vue";
import Login from "./components/Login.vue";
import News from "./components/News.vue";
import Edit from "./components/Edit.vue";
export default {
  name: "App",
  components: {
    
   Signup,
    Login,
    News,
    Edit,
    
  }
};
</script>
<template>

<router-view></router-view> 

</template>

<style>
</style> 