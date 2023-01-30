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

    for (let i = 0; i < owners.length; i++) {
      const owner = owners[i];
      ethValue += await this.adapterService.getETHValue(owner, closestBlockNumber);
    }
    return ethValue;
  }
}