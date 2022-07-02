import React from "react";
import { Fade, Reveal } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";

const customAnimation = keyframes`
  from {
    opacity: 0.4;
    transform: translate3d(0, 75px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

// The UniversalFadeAnimation is a reusable component that wraps around
// any set of divs you want and runs a Fade animation on each div as it enters
// the user's viewport. It's a great way to make a page fade in as the user scrolls
// down. Again, just wrap all significant divs in it. All of the children divs will be
// animated on scroll. No need to repeatedly wrap each div in the component.
// Take a look at the Home.tsx and Categories.tsx page to see how I specifically
// wrap the important divs in the UniversalFadeAnimation.
// Thanks React-Awesome-Reveal!

// CURRENT OPTIONS: 
//  - Don't define animationType = defaults to Reveal with custom fade up animation.
//  - Define animationType = "appear" to use a less jarring animation that just slowly appears.
export default function UniversalFadeAnimation({
    children,
    animationType = "fadeUp",
}: any) {
    return animationType === "appear" ? (
        <Fade cascade damping={0} triggerOnce={true} duration={400}>
            {children}
        </Fade>
    ) : (
        <Reveal
            cascade
            damping={0}
            keyframes={customAnimation}
            triggerOnce={true}
            duration={700}
        >
            {children}
        </Reveal>
    );
}
