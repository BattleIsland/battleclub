export type Coordinates = {
    x: number;
    y: number;
}

export type Item = {
    id: string;
    coords: Coordinates;
    type: string;
}

export type ThisPlayerState = {
    health: number;
    direction: number;
    coordinates: Coordinates;
}

export type OtherPlayerState = {
    userId: string;
    direction: number;
    coordinates: Coordinates;
}

export type GameState = {
    thisPlayerState: ThisPlayerState;
    items: Item[];
    otherPlayerStates: OtherPlayerState[];
}