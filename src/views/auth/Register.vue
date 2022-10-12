<template>
    <div class="add">
        <div class>
            <div class="col-md-6 offset-md-3">
                <h4 class="text-center mt-4">
                    Sign up and create your awesome albumes
                </h4>

                <form action="#" enctype="multipart/form-data">
                    <div class="input-group mt-4">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="name">Name</span>
                        </div>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            v-model="name"
                            class="form-control"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </div>

                    <div class="input-group mt-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="email"
                                >Email</span
                            >
                        </div>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            v-model="email"
                            class="form-control"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </div>

                    <div class="input-group mt-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="email"
                                >Password</span
                            >
                        </div>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            v-model="password"
                            class="form-control"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </div>

                    <div class="input-group mt-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="email"
                                >Password confirmation</span
                            >
                        </div>
                        <input
                            type="password"
                            name="password_confirmation"
                            id="password_confirmation"
                            v-model="password_confirmation"
                            class="form-control"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </div>

                    <div class="form-group mt-3">
                        <button
                            type="submit"
                            class="btn btn-info btn-block"
                            @click.prevent="performRegister"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
                <circle-spin v-show="isLoading"></circle-spin>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";

export default {
    name: "register",
    data() {
        return {
            name: "",
            email: "",
            password: "",
            password: "",
            password_confirmation: "",
            isLoading: false,
        };
    },
    methods: {
        ...mapActions(["register"]),
        performRegister() {
            this.isLoading = true;
            this.register({
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation,
            })
                .then(() => {
                    this.isLoading = false;
                    this.$router.push("/dashboard");
                    this.$toast.success({
                        title: "Success",
                        message: "Account created successfully",
                    });
                })
                .catch((error) => {
                    this.isLoading = false;
                    this.$toast.error({
                        title: "Error",
                        message: error.response.data.message,
                    });
                });
        },
    },
};
</script>

<style></style>
