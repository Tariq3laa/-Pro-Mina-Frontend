<template>
    <div class="container-fluid" v-if="isLoggedIn">
        <div class="row">
            <div class="col">
                <h3 class="col text-center mt-3">Welcome, {{ user.name }}</h3>
                <hr />
            </div>
        </div>

        <div
            v-if="albums.length > 0"
            class="row d-flex justify-content-center container-fluid mt-1 mb-5"
        >
            <div
                class="card p-3 bg-white mr-4 mb-4 col-3"
                style="width: 20rem;"
                v-for="album in albums"
                :key="album.id"
            >
                <div class="about-product text-center mb-2">
                    <img
                        v-if="album.image"
                        :src="album.image.path"
                        class="card-img-top"
                    />
                    <img
                        v-else
                        src="../../assets/default.jpg"
                        class="card-img-top"
                    />
                </div>
                <div>
                    <span>Name: </span><span>{{ album.name }}</span>
                </div>
                <div>
                    <span>Pictures: </span
                    ><span>{{ album.pictures_count }}</span>
                </div>
                <div>
                    <span>Creation Date: </span
                    ><span>{{ album.created_at }}</span>
                </div>

                <div class="d-flex justify-content-around container mt-2">
                    <a @click.prevent="show(album.id)" class="btn btn-success">
                        View
                    </a>
                    <a @click.prevent="edit(album.id)" class="btn btn-primary">
                        Edit
                    </a>
                    <a
                        @click.prevent="remove(album.id, album.pictures_count)"
                        class="btn btn-danger"
                        >Delete</a
                    >
                </div>
            </div>
        </div>

        <div v-else>
            <h1 class="col display-5 text-center mt-3 mb-3">
                Unfortunately, you have no albums yet :(
                <br /><br />
                <router-link
                    :to="{ name: 'album.create' }"
                    tabindex="-1"
                    aria-disabled="true"
                    >Let's add one</router-link
                >
            </h1>
            <circle-spin v-show="isLoading"></circle-spin>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";

export default {
    data() {
        return {
            isLoading: true,
        };
    },
    computed: mapGetters(["user", "isLoggedIn", "albums"]),
    methods: {
        ...mapActions(["fetchAlbums", "deleteAlbum"]),
        show(id) {
            this.$router.push(`/album/${id}/show`);
        },
        edit(id) {
            this.$router.push(`/album/${id}/edit`);
        },
        remove(id, pictures_count) {
            if (pictures_count) this.$router.push(`/album/${id}/delete`);
            else {
                this.deleteAlbum({ id })
                .then(() => {
                    this.fetchAlbums();
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
            }
        },
    },
    created() {
        this.fetchAlbums()
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
