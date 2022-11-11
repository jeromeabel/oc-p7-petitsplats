import { DataApp } from "./api/DataApp.js";

/**
 * Main application
 */
const app = () => {
    // 1 - Get Data
    DataApp.init();
    console.log(DataApp.ustensils);
    // 3 - SearchInput


    // Filters
    
    // Tags

    // Recipes
};

document.addEventListener("DOMContentLoaded", app);