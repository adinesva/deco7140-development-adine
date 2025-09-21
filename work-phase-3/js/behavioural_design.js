// js/behavioural_design.js
import { initViewer } from "./modules/viewer.js";

console.log("🔥 behavioural_design.js is running");
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ behavioural_design.js loaded");
    initViewer(".gallery", "#viewer");
});