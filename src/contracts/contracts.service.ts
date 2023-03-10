import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AdapterService } from 'src/adapter/adapter.service';
import { GetEtherValueQuery } from './dto/contract.dto';

@Injectable()
export class ContractsService {
  constructor(
    @Inject(forwardRef(() => AdapterService))
    private adapterService: AdapterService,
  ) {}

  async getBaycHolderETHValue(epochTime: number): Promise<number> {
    const baycAddress = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';
    let owners = await this.adapterService.getNftOwners(baycAddress);
    if(owners.length < 1) {
      return 0;
    }
    let ethValue = 0;
    let closestBlockNumber = null;
    if(epochTime) {
      closestBlockNumber = await this.adapterService.getClosestBlock(epochTime);
    }

    const chunkSize = 200;
    for (let i = 0; i < owners.length; i += chunkSize) {
      const chunk = owners.slice(i, i + chunkSize);
      let result = await Promise.all(chunk.map(address => this.adapterService.getETHValue(address, closestBlockNumber)));
      ethValue += result.reduce((partialSum, a) => partialSum + a, 0);
    }
    return ethValue;
  }
}