import Axios, { AxiosInstance } from "axios";
import { GetArtworksResponse, SearchResponse } from "@api/api.types";
import ENDPOINTS from "./endpoints";

export class Api {
    private static instance: Api;
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = Axios.create({
            baseURL: "https://api.artic.edu/",
            timeout: 30000,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    setup() {
        this.axiosInstance.interceptors.response.use(
            (response) => {
                return response.data;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    public static getInstance() {
        if (!Api.instance) {
            Api.instance = new Api();
            Api.instance.setup();
        }

        return Api.instance;
    }

    async getArtworks(params?: any) {
        return this.axiosInstance.get<any, GetArtworksResponse>(
            ENDPOINTS.ARTWORKS,
            { params }
        );
    }

    async searchArtworks(params?: any) {
        return this.axiosInstance.get<any, SearchResponse>(ENDPOINTS.SEARCH, {
            params: { params },
        });
    }
}
