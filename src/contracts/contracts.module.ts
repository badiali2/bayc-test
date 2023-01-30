import { forwardRef, Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { AdapterModule } from 'src/adapter/adapter.module';

@Module({
  imports: [
    forwardRef(() => AdapterModule)
  ],
  controllers: [ContractsController],
  providers: [ContractsService]
})
export class ContractsModule {}
