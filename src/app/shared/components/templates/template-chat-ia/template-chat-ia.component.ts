import { Component, ViewChild, ElementRef } from '@angular/core';
import { ImageInputTextComponent } from '../../molecules/image-input-text/image-input-text.component';

@Component({
  selector: 'app-template-chat-ia',
  templateUrl: './template-chat-ia.component.html',
  styleUrls: ['./template-chat-ia.component.scss']
})
export class TemplateChatIAComponent {
  @ViewChild(ImageInputTextComponent) imageInputTextComponent!: ImageInputTextComponent;
  @ViewChild('messageContainer') messageContainer!: ElementRef;

  chat = [
    { srcChat: 'assets/icons/chatIA.png', altChat: 'chatIA', select: false }
  ];

  chatResponse = [
    { srcResponse: 'assets/icons/chatIA.png', srcResponse2: 'assets/icons/joinChatIa.png', altResponse: 'responseIA' },
  ];

  clientMessages: string[] = [];
  message: string[] = [];
  userInput: string = '';
  isWaitingForResponse: boolean = false;

  combinedMessages: { text: string, isClient: boolean }[] = [];

  openChat() {
    this.chat[0].select = true;
    console.log('open chatIA');
  }

  closeChat() {
    this.chat[0].select = false;
  }

  onUserInputChange(input: string) {
    this.userInput = input;
  }

  sendUserMessage() {
    if (this.userInput.trim()) {
      const userMessage = { text: this.userInput, isClient: true };
      this.combinedMessages.push(userMessage);
      this.clientMessages.push(this.userInput);
      console.log('User Message:', this.userInput);
      this.userInput = '';
      this.isWaitingForResponse = true;
      this.simulateAIResponse();

      // Limpiar el input de texto
      this.imageInputTextComponent.inputControl.setValue('');

      // Desplazar automáticamente el contenedor de mensajes hacia abajo
      this.scrollToBottom();
    }
  }

  onEnterPressed() {
    this.sendUserMessage();
  }

  simulateAIResponse() {
    setTimeout(() => {
      const aiResponse = 'Lorem ipsum dolor sit amet, consectetur adipiscing';
      const responseMessage = { text: aiResponse, isClient: false };
      this.combinedMessages.push(responseMessage);
      this.message.push(aiResponse);
      console.log('AI Response:', aiResponse);
      this.isWaitingForResponse = false;

      this.scrollToBottom();
    }, 1000); 
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const container = this.messageContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }, 0); 
  }
  
}
