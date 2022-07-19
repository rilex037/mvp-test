import {defineStore, acceptHMRUpdate} from "pinia";

export const useUserStore = defineStore({
    id: "user",
    state: () => ({
        provider: null,
    }),

    actions: {
        async storeProvider(provider) {
            this.provider = provider;
        },
    },
});
