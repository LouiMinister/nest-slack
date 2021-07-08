import { Module } from '@nestjs/common';
import { WorkspacesService } from 'src/workspaces/workspaces.service';
import { ChannelsController } from './channels.controller';

@Module({
  providers: [WorkspacesService],
  controllers: [ChannelsController],
})
export class ChannelsModule {}
