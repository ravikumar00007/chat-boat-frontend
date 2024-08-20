import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewChecked{
  title = 'chat-boat';
  messages: { type: string, text: string }[] = [];
  userMessage: string = '';

  @ViewChild('chatBox') private chatBox!: ElementRef;

  constructor(private chatService: ChatService) {} // Inject ChatService

  sendMessage() {
    if (this.userMessage.trim()) {
      // Add user message
      this.messages.push({ type: 'user-message', text: this.userMessage });

      // Send user message to the backend
      this.chatService.sendMessage(this.userMessage).subscribe(
        (response: string) => {
          // Add bot response to messages
          this.messages.push({ type: 'bot-message', text: response }); // Directly use response as string
          // Clear user message
          this.userMessage = '';
          // Scroll to the bottom after receiving the response
          this.scrollToBottom();
        },
        (error) => {
          // Handle error
          console.error('Error:', error);
          // Optionally add an error message to the chat
          this.messages.push({ type: 'bot-message', text: 'Sorry, there was an error.' });
          this.userMessage = '';
          // Scroll to the bottom after error
          this.scrollToBottom();
        }
      );
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    try {
      const chatBox = this.chatBox.nativeElement;
      chatBox.scrollTop = chatBox.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }
}
