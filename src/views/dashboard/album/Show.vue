<template>
    <div class="container-fluid" v-if="isLoggedIn">
        <div v-if="album.pictures.length > 0">
            <h5 class="col display-5 text-center my-3">
                <router-link
                    :to="{ name: 'picture.create', params: { id: id } }"
                    tabindex="-1"
                    aria-disabled="true"
                    >Click here to add new picture</router-link
                >
            </h5>
            <div
                class="row d-flex justify-content-center container-fluid mt-1 mb-5"
            >
                <div
                    class="card p-3 bg-white mr-4 mb-4 col-3"
                    style="width: 20rem;"
                    v-for="pic in album.pictures"
                    :key="pic.id"
                >
                    <div class="about-product text-center mb-2">
                        <img :src="pic.path" class="card-img-top" />
                    </div>
                    <div>
                        <span>Name: </span><span>{{ pic.title }}</span>
                    </div>
                    <div>
                        <span>Creation Date: </span
                        ><span>{{ pic.created_at }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <h1 class="col display-5 text-center mt-5">
                Unfortunately, you have no pictures yet :(
                <br />
                <br />
                <router-link
                    :to="{ name: 'picture.create', params: { id: id } }"
                    tabindex="-1"
                    aria-disabled="true"
                    >Click here to add one</router-link
                >
            </h1>
        </div>
        <circle-spin v-show="isLoading"></circle-spin>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";

export default {
    data() {
        return {
            id: this.$route.params.id,
            isLoading: true,
            album: [],
        };
    },
    computed: mapGetters(["user", "isLoggedIn"]),
    methods: mapActions(["showAlbum"]),
    created() {
        this.showAlbum({ id: this.id })
            .then((response) => {
                this.album = response.data;
                this.isLoading = false;
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
