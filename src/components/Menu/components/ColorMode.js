import React from "react";

export const ColorModeContext = React.createContext({
    mode: "",
    setMode: () => { alert("Not configured yet!") },
    toggleMode: () => { alert("Not configured yet!") }
 });

export default function ColorModeProvider(props) {
    const [mode, setMode] = React.useState(props.initialMode);

    const toggleMode = () => setMode(mode === "light"  ? "dark" : "light")

    return (
        <ColorModeContext.Provider value={{ mode, toggleMode }}>
            { props.children }
        </ColorModeContext.Provider>
    );
}