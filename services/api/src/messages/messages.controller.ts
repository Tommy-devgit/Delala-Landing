import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { MessagesService } from "./messages.service";

@ApiTags("messages")
@Controller("messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @ApiOperation({ summary: "Send a direct inquiry message to broker or seeker" })
  sendMessage(@Body() body: { senderId: string; receiverId: string; propertyId: string; content: string }) {
    return this.messagesService.sendMessage(body.senderId, body.receiverId, body.propertyId, body.content);
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Get all conversation threads for user" })
  getConversations(@Param("userId") userId: string) {
    return this.messagesService.getConversations(userId);
  }
}
