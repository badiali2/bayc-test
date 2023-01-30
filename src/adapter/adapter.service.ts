import { Injectable } from '@nestjs/common';
import { Web3Service } from "nest-web3";
import { Network, Alchemy } from "alchemy-sdk";
import { BlockTransactionString } from 'web3-eth';

@Injectable()
export class AdapterService {
    private client = this.web3Service.getClient('eth');
    private alchemy = new Alchemy({
        apiKey: "xlWyVz94Kt63IUVNUsoJZ_DpbXXKu-7t",
        network: Network.ETH_MAINNET,
    });
    constructor(
        private readonly web3Service: Web3Service
    ) {

    }

    async getETHValue(address: string, blockNumber?: number): Promise<number> {
        let ether = await this.client.eth.getBalance(address, blockNumber)
        return +ether * (10 ** -18);
    }

    async getNftOwners(address: string): Promise<string[]> {
        let response = await this.alchemy.nft.getOwnersForContract(address);
        return response.owners;
    }

    async getClosestBlock(epochTime: number) {
        let minBlockNumber = 0
        let maxBlockNumber = await this.client.eth.getBlockNumber();
        let closestBlockNumber = 0;
        let closestBlock = null;

        while (minBlockNumber <= maxBlockNumber) {
            closestBlockNumber = Math.floor((maxBlockNumber + minBlockNumber) / 2)
            closestBlock = await this.client.eth.getBlock(`${closestBlockNumber}`);
            if (closestBlock.epochTime === epochTime) {
                break;
            } else if (closestBlock.epochTime > epochTime) {
                maxBlockNumber = closestBlockNumber - 1
            } else {
                minBlockNumber = closestBlockNumber + 1
            }
        }

        return closestBlockNumber;
    }
}
