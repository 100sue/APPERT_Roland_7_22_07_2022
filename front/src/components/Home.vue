<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
export default {
    name: "Home",
}
</script>


<template>

    <div class="container-fluid">
        <div class="row no-gutter">
            <div class="col-md-6 d-none d-md-flex bg-image">
            </div>
            <div class="col-md-6 bg-light">
                <div class="login d-flex align-items-center py-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-10 col-xl-7 mx-auto">
                                <h3 class="display-4 text-center">Groupomania</h3>
                                <p class="text-muted mb-4 text-center">Afin de nous connaître et partager, au-delà de l'entreprise !</p>
                                <form>
                                    <div class="d-grid gap-2 mt-2">
                                        <router-link to="/signup"
                                            class="btn btn-danger btn-block text-uppercase mb-2 rounded-pill shadow-sm">
                                            Inscription</router-link>
                                        <router-link to="/login"
                                            class="btn btn-danger btn-block text-uppercase mb-2 rounded-pill shadow-sm">
                                            Connexion</router-link>
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