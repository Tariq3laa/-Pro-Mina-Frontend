<template>
    <div class="add">
        <div class>
            <div class="col-md-6 offset-md-3">
                <h2 class="text-center mt-4">Create Album</h2>

                <form action="#">
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

                    <div class="form-group mt-3">
                        <button
                            type="submit"
                            class="btn btn-info btn-block"
                            @click.prevent="store"
                        >
                            Save
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
    name: "storeAlbum",
    data() {
        return {
            name: "",
            isLoading: false,
        };
    },
    methods: {
        ...mapActions(["storeAlbum"]),
        store() {
            this.isLoading = true;
            this.storeAlbum({
                name: this.name
            })
                .then(() => {
                    this.isLoading = false;
                    this.$router.push("/dashboard");
                    this.$toast.success({
                        title: "Success",
                        message: "Album created successfully",
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
