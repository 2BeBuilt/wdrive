import { NFTStorage, File } from 'nft.storage';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.NFT_STORAGE_API_KEY;

async function storeAsset() {
    const client = new NFTStorage({ token: API_KEY });
    for (let i = 1; i <= 12; i++) {
        const metadata = await client.store({
            name: `XII Warp Fleet #${i}`,
            description:
                'In the 41st millennium, the XII Warp Fleet, once a unified force, was torn asunder by the Great Blockchain Schism. Cast into the void and corrupted by the Warp, the twelve spacefaring vessels turned upon one another, their allegiance to the Emperor forgotten. Now, in a galaxy consumed by chaos, these once-brotherly ships wage eternal war as enemies, each vying for supremacy among the fractured realms of the blockchain, their once-noble banners stained by darkness and betrayal.',
            image: new File([await fs.promises.readFile(`assets/${i}.png`)], `${i}.png`, {
                type: 'image/png',
            }),
        });
        console.log('Metadata stored on Filecoin and IPFS with URL:', metadata.url);
    }
}

storeAsset()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
