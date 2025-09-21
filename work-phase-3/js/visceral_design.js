// js/visceral_design.js
import { initViewer } from "./modules/viewer.js";

console.log("🔥 visceral_design.js is running");
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ visceral_design.js loaded");
    initViewer(".gallery", "#viewer");
});