import React from "react";
import Routes from "./routes";
import { NavBar, SearchBar } from "./components";

const App = () => {
    return(
        <div>
            <NavBar />
            <Routes />
            <SearchBar />
        </div>
    )
}

export default App;
