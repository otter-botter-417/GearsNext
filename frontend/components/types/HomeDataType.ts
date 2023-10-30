import { HomeItemType } from "./HomeItemType";
import { HomeLayoutType } from "./HomeLayoutType";

export type HomeDataType = {
    topViewedItems: HomeItemType[];
    topFavoriteItems: HomeItemType[];
    newlyArrivedItems: HomeItemType[];
    topViewedLayouts: HomeLayoutType[];
    topFavoriteLayouts: HomeLayoutType[];
    newlyArrivedLayouts: HomeLayoutType[];
};