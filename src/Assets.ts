import {useEffect, useState} from 'react';

type SpriteAttributes = {
    sx: number;
    sy: number;
    sw: number;
    sh: number;
};


type Asset = {
    filename: string;
    sprites: {
        [type: string]: SpriteAttributes
    }
};

const ASSETS: Asset[] = [
    { 
        filename: 'sprites.png',
        sprites: {
            'gun': {
                sx: 1522,
                sy: 2020,
                sw: 159,
                sh: 22,
            },
            'player': {
                sx: 852,
                sy: 3510,
                sw: 90,
                sh: 90,
            },
            'hand': {
                sx: 3250,
                sy: 2166,
                sw: 34,
                sh: 34
            },
            'rock': {
                sx: 3332,
                sy: 0,
                sw: 177,
                sh: 163
            },
            'toilet': {
                sx: 540,
                sy: 675,
                sw: 128,
                sh: 179
            },
        },
    }
];

export type Assets = {
    [assetFilename: string]: {
        image: HTMLImageElement,
        sprites: {
            [type: string]: SpriteAttributes
        }
    }
};


export const useAssets = () => {
    const [assets, setAssets] = useState<Assets>({});
    const [loading, setLoading] = useState(true);

    const downloadAsset = (asset: Asset) => {
        return new Promise<void>(resolve => {
            const assetImage = new Image();
            assetImage.onload = () => {
                setAssets((oldAssets) => {
                    return {...oldAssets, [asset.filename]: {image: assetImage, sprites: asset.sprites}}
                });
                resolve();
            };
            assetImage.src = asset.filename;
        });
    }

    const downloadPromise = () => Promise.all(ASSETS.map(downloadAsset));

    useEffect(() => {
        setLoading(true);
        downloadPromise().then(() => setLoading(false));
    }, [])

    return {assets, loading}
}