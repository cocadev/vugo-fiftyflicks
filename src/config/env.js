import React from "react";

function ReactIsInDevelomentMode() {
    return "_self" in React.createElement("div");
}

var env = {};

if (ReactIsInDevelomentMode()) {
    env = { mode: "dev" }; // Change to prod for prod
    console.log("vugo dev mode");
} else {
    env = { mode: "prod" };
    console.log("vugo prod v1");
}

export default env;
