import { Component, ViewChild, ElementRef } from '@angular/core';
import { ImageInputTextComponent } from '../../molecules/image-input-text/image-input-text.component';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-template-chat-ia',
  templateUrl: './template-chat-ia.component.html',
  styleUrls: ['./template-chat-ia.component.scss']
})
export class TemplateChatIAComponent {

  constructor(private apiService: ApiService) {}

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
      console.log('User Message:', this.userInput);
  
      this.isWaitingForResponse = true;
  
      // Realizar la consulta al backend
      this.apiService.iaResponse(this.userInput, this.combinedMessages).subscribe({
        next: (response) => {
          // Verificar si la respuesta es válida y tiene la estructura esperada
          if (response && response.history && typeof response.history.response === 'string') {
            const aiResponse = response.history.response || 'No se recibió respuesta';
            const responseMessage = { text: aiResponse, isClient: false };
            this.combinedMessages.push(responseMessage);
            console.log('AI Response:', aiResponse);
          } else {
            console.error('Estructura de respuesta inesperada:', response);
            this.combinedMessages.push({ text: 'Lo siento, no puedo responder tu pregunta, por favor comunicate con un asesor :', isClient: false });
          }
  
          this.isWaitingForResponse = false;
        },
        error: (error) => {
          console.error('Error en la consulta:', error);
          this.isWaitingForResponse = false;
        }
      });
  
      // Limpiar el input de texto
      this.imageInputTextComponent.inputControl.setValue('');
      this.userInput = '';
  
      this.scrollToBottom();
    }
  }  

  onEnterPressed() {
    this.sendUserMessage();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const container = this.messageContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }, 0); 
  }

}
