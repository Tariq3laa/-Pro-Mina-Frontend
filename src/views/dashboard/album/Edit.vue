<template>
    <div class="edit">
        <div class>
            <div class="col-md-6 offset-md-3">
                <h2 class="text-center mt-4">Edit Album Form</h2>

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
                            @click.prevent="update"
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
    name: "updateAlbum",
    data() {
        return {
            id: this.$route.params.id,
            name: "",
            isLoading: false,
        };
    },
    methods: {
        ...mapActions(["showAlbum", "updateAlbum"]),
        setImage(image) {
            this.image = image;
        },
        update() {
            this.isLoading = true;
            this.updateAlbum({
                id: this.id,
                name: this.name,
                image: this.image,
                price: this.price,
                description: this.description,
            })
                .then(() => {
                    this.isLoading = false;
                    this.$router.push("/dashboard");
                    this.$toast.success({
                        title: "Success",
                        message: "Album updated successfully",
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
    created() {
        this.showAlbum({ id: this.id })
            .then((response) => {
                this.name = response.data.name;
            })
            .catch((error) => {
                this.isLoading = false;
                this.$toast.error({
                    title: "Error",
                    message: error.response.data.message,
                });
            });
    },
};
</script>
