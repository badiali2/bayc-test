import { Module } from '@nestjs/common';
import { AdapterService } from './adapter.service';
import { Web3Module } from 'nest-web3';

@Module({
  imports: [Web3Module.forRoot({
    name: 'eth',
    url: 'https://eth.llamarpc.com',
  })],
  providers: [AdapterService],
  exports: [AdapterService]
})
export class AdapterModule { }
