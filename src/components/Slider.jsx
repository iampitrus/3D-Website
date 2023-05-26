import Slide from "@mui/base/Slider";
import { useSnapshot } from "valtio";
import state from "../store";

function Slider({ orientation }) {
  const snap = useSnapshot(state);

  // Update the state to rotate the shirt
  function handleChange(e) {
    if (orientation === "vertical") {
      state.verticalView = e.target.value;
    } else {
      state.horizontalView = e.target.value;
    }
  }

  return (
    <Slide
      onChange={handleChange}
      orientation={orientation}
      defaultValue={0}
      max={3}
      step={0.0001}
      min={-3}
      slotProps={{
        thumb: {
          className: `ring-cyan-500 ring-2 rounded-sm ${
            orientation === "horizontal"
              ? "w-2 h-5 -mt-1.5 -ml-2"
              : "w-5 h-2 -ml-1.5 -mt-2"
          } flex items-center justify-center bg-white shadow absolute`,
        },
        root: {
          className: `${
            orientation === "horizontal" ? " w-[200px]" : "h-[200px]"
          } relative inline-block h-2 cursor-pointer`,
        },
        rail: {
          className: `border-cyan-500 bg-white b-2 border-2 ${
            orientation === "horizontal" ? "h-2 w-full" : "h-full w-2"
          } absolute opacity-[0.5]`,
        },
      }}
    />
  );
}

export default Slider;
