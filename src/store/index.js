import { proxy } from "valtio";

const state = proxy({
  // Check if i'm at the homepage
  intro: true,
  color: "#efbd48",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./threejs.png",
  fullDecal: "./threejs.png",
  verticalView: 0,
  horizontalView: 0,
});

export default state;
