import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContractsModule } from './contracts/contracts.module';
import { AdapterModule } from './adapter/adapter.module';
import { Web3Module } from 'nest-web3';

@Module({
  imports: [
    Web3Module.forRoot({
      name: 'eth',
      url: 'https://eth.llamarpc.com',
    }),
    ContractsModule, AdapterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
