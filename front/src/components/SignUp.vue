 <script>
 import "bootstrap/dist/css/bootstrap.min.css";
 import "../App.css";
 
 function signUser(email, password) {                                              // Signup user
 
     const url = 'http://localhost:5173/api/auth/signup';
    
    fetch(url, {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({ email, password })
     })
         .then(response => response.json())
         .then((res) => {
 
             if (res.error) {                                                     // Les erreurs de user.js dans le back
                 console.log(res.error);
                 alert(res.error.message);
                 return;
             }
             if (res.errors) {                                                    // Les erreurs de validator.js dans le back
                 const findMsg = res.errors.find(function (element) {
                     return element.msg
                 });
                 if (findMsg) {
                     alert(findMsg.msg);
                     return;
                 }
             }
             else {
 
                 this.$router.push("/login");
             }
         })
         .catch(error => {
             console.log(error);
         });
 }
 
 export default {
     name: "Signup",
     methods: {
         signUser,
     }
 }
</script>

<template>

    <div  class="container-fluid">
        <div class="row no-gutter">
            <div class="col-md-6 d-none d-md-flex bg-image"></div>
            <div class="col-md-6 bg-light">
                <div class="login d-flex align-items-center py-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-10 col-xl-7 mx-auto">
                                <h3 class="display-4 text-center">Groupomania</h3>
                                <p class="text-muted mb-4 text-center">Afin de nous connaître et partager, au-delà de l'entreprise ! </p>
                                <form>
                                    <div class="mb-3">
                                        <input id="inputEmail" type="email" placeholder="Email address" required=""
                                            autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4"
                                            v-model="email" />
                                    </div>
                                    <div class="mb-3">
                                        <input id="inputPassword" type="password" placeholder="Password" required=""
                                            class="form-control rounded-pill border-0 shadow-sm px-4 text-danger"
                                            v-model="password" />
                                    </div>
                                    <div class="d-grid gap-2 mt-2">
                                        <button type="submit"
                                            class="btn btn-danger btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                                            @click.prevent="signUser(email, password)">Inscription</button>
                                        <router-link to="/login"
                                            class="btn btn-danger btn-block text-uppercase mb-2 rounded-pill shadow-sm">
                                            J'ai déjà un compte !</router-link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>  