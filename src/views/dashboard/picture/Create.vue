<template>
    <div class="add">
        <div class>
            <div class="col-md-6 offset-md-3">
                <h4 class="text-center mt-4">Add Picture to your album</h4>

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
                            <span
                                class="input-group-text"
                                id="inputGroupFileAddon01"
                                >Image</span
                            >
                        </div>
                        <div class="custom-file">
                            <input
                                type="file"
                                accept="image/*"
                                id="image"
                                name="image"
                                @change="setImage($event.target.files[0])"
                                class="custom-file-input"
                                aria-describedby="inputGroupFileAddon01"
                            />
                            <label class="custom-file-label" for="image"
                                >Choose image</label
                            >
                        </div>
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
    name: "storePicture",
    data() {
        return {
            name: "",
            image: null,
            isLoading: false,
            album_id: this.$route.params.id
        };
    },
    methods: {
        ...mapActions(["storePicture"]),
        setImage(image) {
            this.image = image;
        },
        store() {
            this.isLoading = true;
            this.storePicture({
                name: this.name,
                image: this.image,
                album_id: this.album_id
            })
                .then(() => {
                    this.isLoading = false;
                    this.$router.push(`/album/${this.album_id}/show`);
                    this.$toast.success({
                        title: "Success",
                        message: "Picture created successfully",
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
