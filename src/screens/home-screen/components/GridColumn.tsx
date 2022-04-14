import React from "react";
import { View } from "react-native";
import { ArtItem } from "@model/index";
import GridItem from "./GridItem";

type GridColumnPros = {
    position: "left" | "right";
    data: ArtItem[];
};

const GridColumn = ({ position, data }: GridColumnPros) => {
    const smallTileIndex = position === "left" ? 0 : data.length - 1;

    return (
        <View style={{ paddingHorizontal: 4 }}>
            {data.map((item, index) => {
                return (
                    <GridItem
                        key={index}
                        {...{ item, index, smallTileIndex }}
                    />
                );
            })}
        </View>
    );
};

export default GridColumn;
