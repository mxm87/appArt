import { SharedElementsComponentConfig } from "react-navigation-shared-element";
import { StackCardStyleInterpolator } from "@react-navigation/stack";
import ROUTES from "./routes";

export const transitionInterpolation: StackCardStyleInterpolator = ({
    current,
}) => ({
    cardStyle: {
        opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: "clamp",
        }),
    },
});

export const sharedElementsConfig: SharedElementsComponentConfig = (
    route,
    otherRoute,
    showing
) => {
    return [
        otherRoute.name === ROUTES.HOME && {
            id: `artwork.${
                showing
                    ? route.params.initialScrollIndex
                    : otherRoute.params.currentScrollIndex
            }`,
            animation: "move",
        },
    ];
};
