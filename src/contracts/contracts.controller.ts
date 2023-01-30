import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { GetEtherValueResponse } from './dto/contract.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get("/bayc/owners-ether-value")
  async GetEtherValue(@Query() query) {
    let response : GetEtherValueResponse = {
      eth_value: await this.contractsService.getBaycHolderETHValue(query['epoch'])
    }
    return response
  }
}
