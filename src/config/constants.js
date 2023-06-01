import {
  swatch,
  fileIcon,
  ai,
  logoShirt,
  stylishShirt,
  download,
  pattern1,
  pattern2,
  pattern3,
  pattern4,
  github,
  tailwindcss,
  react,
  twitter,
  pattern5,
  pattern6,
  pattern7,
  pattern8,
} from "../assets";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  {
    name: "aipicker",
    icon: ai,
  },
];

export const FilterTabs = [
  {
    name: "logoShirt",
    icon: logoShirt,
  },
  {
    name: "stylishShirt",
    icon: stylishShirt,
  },
  {
    name: "download",
    icon: download,
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};

export const GalleryImages = [
  { name: "pattern", src: pattern1 },
  { name: "pattern", src: pattern2 },
  { name: "pattern", src: pattern3 },
  { name: "pattern", src: pattern4 },
  { name: "pattern", src: pattern5 },
  { name: "pattern", src: pattern6 },
  { name: "pattern", src: pattern7 },
  { name: "pattern", src: pattern8 },
  { name: "logo", src: github },
  { name: "logo", src: tailwindcss },
  { name: "logo", src: react },
  { name: "logo", src: twitter },
];
