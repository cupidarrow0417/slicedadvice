import Script from "next/script";
import React from "react";

export default function Crisp() {
    return (
        <Script
            id="crisp-widget"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
      window.$crisp=[];
      window.CRISP_WEBSITE_ID="f007f192-23cb-40c9-a34b-a3cdb538e0ec";
      (function(){
        const d = document;
        const s = d.createElement("script");
        s.src = "https://client.crisp.chat/l.js";
        s.async = 1;
        d.getElementsByTagName("head")[0].appendChild(s);
      })();`,
            }}
        />
    );
}
