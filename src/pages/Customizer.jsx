import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  AiPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Slider,
  Tab,
} from "../components";

function Customizer() {
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  // Show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeFilterTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return (
          <AiPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  // Calling our AI backend
  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt! ");

    try {
      // call our backend to generate ai image
      setGeneratingImg(true);
      const response = await fetch("http://localhost:8080/api/v1/dalle", {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
    }
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    // update the state
    state[decalType.stateProperty] = result;
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isFullTexture = false;
        state.isLogoTexture = true;
        break;
    }
    // After setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => {
                      if (activeFilterTab == tab.name) {
                        setActiveFilterTab("");
                      } else {
                        setActiveFilterTab(tab.name);
                      }
                    }}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute top-[8%] right-0 left-0 w-full flex justify-center"
            {...slideAnimation("down")}
          >
            <Slider orientation={"horizontal"} />
          </motion.div>
          <motion.div
            className="absolute  z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type={"filled"}
              title={"Go Back"}
              handleClick={() => {
                state.intro = true;
                state.horizontalView = state.verticalView = 0;
              }}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          <motion.div
            className="absolute top-0 bottom-0 h-full flex flex-col justify-center right-[8%] "
            {...slideAnimation("right")}
          >
            <Slider orientation={"vertical"} />
          </motion.div>
          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => {
                  handleActiveFilterTab(tab.name);
                  if (tab.name == "download") {
                    downloadCanvasToImage();
                  }
                }}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Customizer;
