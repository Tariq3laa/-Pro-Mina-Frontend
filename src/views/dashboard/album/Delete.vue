<template>
    <div class="edit">
        <div class>
            <div class="col-md-6 offset-md-3">
                <h3 class="text-center mt-4">
                    Be careful, you have only 2 options:
                </h3>
                <h4 class="text-center">
                    1- Delete all the pictures in the album
                </h4>
                <h4 class="text-center">
                    2- Move the pictures to another album
                </h4>

                <div class="d-flex justify-content-between container mt-4">
                    <a
                        v-show="false"
                        @click.prevent="edit()"
                        class="btn btn-primary btn-block"
                    >
                        Edit
                    </a>
                    <a @click.prevent="performDelete" class="btn btn-danger btn-block">
                        Delete all
                    </a>
                    <a
                        @click.prevent="movePics = true"
                        class="btn btn-primary btn-block ml-4"
                    >
                        Move the pictures
                    </a>
                </div>
                <form action="#" v-if="movePics">
                    <div class="input-group mt-4">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="name">Choose Album</span>
                        </div>
                        <select
                            id="inputState"
                            class="form-control"
                            v-model="selectedAlbum"
                        >
                            <option
                                v-for="album in albumsDropDown"
                                :key="album.id"
                                :value="album.id"
                                >{{ album.name }}</option
                            >
                        </select>
                    </div>

                    <div class="form-group mt-3">
                        <button
                            type="submit"
                            class="btn btn-info btn-block"
                            @click.prevent="update"
                        >
                            Move
                        </button>
                    </div>
                </form>
                <circle-spin v-show="isLoading"></circle-spin>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";

export default {
    name: "updateAlbum",
    data() {
        return {
            id: this.$route.params.id,
            selectedAlbum: "",
            isLoading: false,
            movePics: false,
        };
    },
    computed: mapGetters(["albumsDropDown"]),
    methods: {
        ...mapActions(["fetchDropDownAlbums", "moveAlbum", "deleteAlbum"]),
        setMovePics(image) {
            this.image = image;
        },
        update() {
            this.isLoading = true;
            this.moveAlbum({
                currentAlbum: this.id,
                selectedAlbum: this.selectedAlbum,
            })
                .then(() => {
                    this.isLoading = false;
                    this.$router.push("/dashboard");
                    this.$toast.success({
                        title: "Success",
                        message: "Album deleted successfully",
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
        performDelete() {
            this.isLoading = true;
            this.deleteAlbum({
                id: this.id
            })
                .then(() => {
                    this.isLoading = false;
                    this.$router.push("/dashboard");
                    this.$toast.success({
                        title: "Success",
                        message: "Album deleted successfully",
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
        this.fetchDropDownAlbums({
            id: this.id
        })
            .then(() => (this.isLoading = false))
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
