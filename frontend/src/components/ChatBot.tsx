import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

const ChatBot = () => {
  return (
    <div style={{ position: "relative", height: "500px" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            <Message
              model={{
                message: "Привет, я бот",
                sentTime: "just now",
                sender: "Алиса",
                direction: "incoming",
                position: "single",
              }}
            />
          </MessageList>
          <MessageInput placeholder="Начните писать..." />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatBot;
