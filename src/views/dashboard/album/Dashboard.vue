<template>
    <!-- <div class="container" v-if="isLoggedIn"> -->
    <div class="container">
        <div class="row">
            <div class="col">
                <h4 class="col text-center mt-3">
                    Welcome <br />
                    <!-- MR: {{ user.name }} -->
                </h4>
            </div>
        </div>

        <!-- <div
            v-if="products.length > 0"
            class="d-flex justify-content-between container mt-5 mb-5"
        >
            <div
                class="card p-3 bg-white"
                style="width: 21rem;"
                v-for="product in products"
                :key="product.id"
            >
                <div class="about-product text-center mt-2">
                    <img :src="product.image" class="card-img-top" />
                    <div>
                        <h4>{{ product.name }}</h4>
                        <h6 class="mt-0 text-black-50">
                            {{ product.description }}
                        </h6>
                    </div>
                </div>
                <div
                    class="d-flex justify-content-between total font-weight-bold"
                >
                    <span>Total</span><span>${{ product.price }}</span>
                </div>

                <div class="d-flex justify-content-around container mt-2">
                    <a
                        @click.prevent="edit(product.id)"
                        class="btn btn-primary"
                    >
                        Edit
                    </a>
                    <a
                        @click.prevent="remove(product.id)"
                        class="btn btn-danger"
                        >Delete</a
                    >
                </div>
            </div>
        </div> -->

        <!-- <div v-else>
            <h1 class="col display-5 text-center mt-3 mb-3">
                No products yet :(
                <circle-spin v-show="isLoading"></circle-spin>
            </h1>
        </div> -->
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {

perPage: 3,
        currentPage: 1,
        items: [
          { id: 1, first_name: 'Fred', last_name: 'Flintstone' },
          { id: 2, first_name: 'Wilma', last_name: 'Flintstone' },
          { id: 3, first_name: 'Barney', last_name: 'Rubble' },
          { id: 4, first_name: 'Betty', last_name: 'Rubble' },
          { id: 5, first_name: 'Pebbles', last_name: 'Flintstone' },
          { id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble' },
          { id: 7, first_name: 'The Great', last_name: 'Gazzoo' },
          { id: 8, first_name: 'Rockhead', last_name: 'Slate' },
          { id: 9, first_name: 'Pearl', last_name: 'Slaghoople' }
        ],

            // isLoading: true,
            isDefault: true,
            defaultImage: "@/assets/default.jpg",
            images: [
                "@/assets/1.jpg",
                "@/assets/2.jpeg",
                "@/assets/3.jpg",
                "@/assets/4.jpg",
            ],
        };
    },
    computed: {...mapGetters(["user", "isLoggedIn", "products"]),
    rows() {
        return this.items.length
      }},
    methods: {
        ...mapActions(["fetchProducts", "deleteProduct"]),
        edit(id) {
            this.$router.push(`/product/${id}/edit`);
        },
        remove(id) {
            this.deleteProduct({ id }).then(() => this.fetchProducts());
        },
    },
    // created() { this.fetchProducts().then(() => (this.isLoading = false)); },
};
</script>
