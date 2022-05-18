<template>
  <div class="card">
    <pv-data-view :value="pets" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
      <template #header>
        <div class="grid grid-gutter">
          <div class="col-6" style="text-align: left">
            <pv-dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)"/>
          </div>
          <div class="col-6 " style="text-align: right">
            <pv-data-view-layout-options class="" v-model="layout"/>
          </div>
        </div>
      </template>
      <template #list="slotProps">
        <div class="col-12">
          <div class="product-list-item">
            <img :src='slotProps.data.image' style="width:5rem"/>
            <div class="product-list-detail">
              <div class="product-name">
                {{slotProps.data.name}}
              </div>
              <div class="product-description">{{ slotProps.data.description}}</div>
              <pv-rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false"></pv-rating>
              <i class="pi pi-tag product-category-icon"></i><span class="product-category">{{slotProps.data.category}}</span>
            </div>
            <div class="product-list-action">
              <span class="product-price">${{ slotProps.data.price }}</span>
              <pv-button icon="pi pi-shopping-cart" @click="openDialog" label="Add to Cart" :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'" />
              <span :class="'product-badge status-'+slotProps.data.inventoryStatus.toLowerCase()">{{slotProps.data.inventoryStatus}}</span>
            </div>
          </div>
        </div>
      </template>
      <template #grid="slotProps">
        <div class="col-12 md:col-4">
          <div class="product-grid-item card">
            <div class="product-grid-item-top">
              <div>
                <i class="pi pi-tag product-category-icon"></i>
                <span class="product-category">{{slotProps.data.category}}</span>
              </div>
              <span :class="'product-badge status-'+slotProps.data.inventoryStatus.toLowerCase()">{{slotProps.data.inventoryStatus}}</span>
            </div>
            <div class="product-grid-item-content">
              <img :src='slotProps.data.image' style="width:5rem"/>
              <div class="product-name">{{slotProps.data.name}}</div>
              <div class="product-description">{{slotProps.data.description}}</div>
              <pv-rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false"></pv-rating>
            </div>
            <div class="product-grid-item-bottom">
              <span class="product-price">${{slotProps.data.price}}</span>
              <pv-button icon="pi pi-shopping-cart" :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'" @click="openDialog"/>
            </div>
          </div>
        </div>
      </template>

    </pv-data-view>
    <pv-dialog header="Confirm" v-model:visible="displayInformation" :style="{width: '450px'}" :modal="true">
      <p class="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <template #footer>
        <pv-button label="No" icon="pi pi-times" @click="hideDialog" class="p-button-text"/>
        <pv-button label="Yes" icon="pi pi-check" @click="hideDialog" autofocus />
      </template>
    </pv-dialog>
  </div>
</template>

<script>
import { PetsApiService } from "../services/pets-api.service";
export default {
  name: "search-list",
  data() {
    return {
      pets: [],
      pet: {},
      petsService: null,
      layout: "grid",
      sortKey: null,
      displayInformation: false,
      sortOrder: null,
      sortField: null,
      sortOptions: [
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' },
      ],
    };
  },
  created() {
    this.petsService = new PetsApiService();
    this.petsService.getAll().then((response) => {
      this.pets = response.data;
      console.log("created");
    });
  },
  methods: {
    onSortChange(event) {
      const value = event.value.value;
      const sortValue = event.value;

      if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
        this.sortKey = sortValue;
      } else {
        this.sortOrder = 1;
        this.sortField = value;
        this.sortKey = sortValue;
      }
    },
    hideDialog() {
      this.displayInformation = false;
    },
    openDialog() {
      this.displayInformation = true;
    }
  }

};
</script>

<style scoped>
.card {
  background: #ffffff;
  padding: 2rem;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
  border-radius: 4px;
  margin-bottom: 2rem;
}
.pv-dropdown {
  width: 14rem;
  font-weight: normal;
}

.product-name {
  font-size: 1.5rem;
  font-weight: 700;
}

.product-description {
  margin: 0 0 1rem 0;
}

.product-category-icon {
  vertical-align: middle;
  margin-right: 0.5rem;
}

.product-category {
  font-weight: 600;
  vertical-align: middle;
}

.product-list-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;
}
img {
  width: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin-right: 2rem;
}
.product-list-detail {
  flex: 1 1 0;
}

.pv-rating {
  margin: 0 0 .5rem 0;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: .5rem;
  align-self: flex-end;
}

.product-list-action {
  display: flex;
  flex-direction: column;
}

.pv-button {
  margin-bottom: .5rem;
}

.product-grid-item {
  margin: .5rem;
  border: 1px solid var(--surface-border);
}
.product-grid-item-top,
.product-grid-item-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

img {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin: 2rem 0;
}

.product-grid-item-content {
  text-align: center;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 600;
}

</style>