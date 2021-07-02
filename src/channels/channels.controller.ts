import { Body, Controller, Get, Param, Query } from '@nestjs/common';

@Controller('api/workspaces/:url/channels')
export class ChannelsController {
  @Get()
  getChannels() {}

  @Post()
  // eslint-disable-next-line prettier/prettier
  createChannel() { }

  @Get(':name/chats')
  getSpecificChannel(@Query() query, @Param() param) {
    console.log(query.perPage, query.page);
    console.log(param.id, param.url);
  }

  @Get(':name/members')
  getAllMembers(@Body() body) {}

  @Get(':name/members')
  inviteMembers() {}
}
