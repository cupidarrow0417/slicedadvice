import Script from "next/script";
import React from "react";

export default function HubSpot() {
    return (
        <Script
            type="text/javascript"
            id="hs-script-loader"
            async
            defer
            src="//js-na1.hs-scripts.com/22387793.js"
        ></Script>
    );
}
