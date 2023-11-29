export type Coordinates = {
    x: number;
    y: number;
}

export type Item = {
    id: string;
    coords: Coordinates;
    type: string;
}

export type GameState = {
    items: Item[];
}