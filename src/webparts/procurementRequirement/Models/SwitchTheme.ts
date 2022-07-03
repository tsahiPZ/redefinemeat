import { createTheme } from "@material-ui/core";
export const SwitchTheme = createTheme({
    overrides: {
        MuiSwitch: {
            switchBase: {
                // Controls default (unchecked) color for the thumb
                // color: "#ccc"
            },
            colorSecondary: {
                "&$checked": {
                    // Controls checked color for the thumb
                    color: "#8754C9"
                }
            },
            track: {
                // Controls default (unchecked) color for the track
                opacity: 0.2,
                // backgroundColor: "#fff",
                "$checked$checked + &": {
                    // Controls checked color for the track
                    opacity: 0.7,
                    backgroundColor: "#8754C9"
                }
            }
        }
    }
});