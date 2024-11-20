<template>
  <div>
    <!-- <template>
  <div>
    <!-- Draggable Side Button -->
    <div 
      class="side-btn-box" 
      :class="{ 'is-dragging': isDragging }"
      :style="{ cursor: isDragging ? 'move' : 'pointer', top: buttonPositionY + 'px' }"
      id="dragElement"
      @click="handleClick"
    >
      <el-icon :size="24" color="white">
        <UserFilled />
      </el-icon>
    </div>

    <!-- 对话框 -->
    <el-dialog 
      v-model="dialogVisible" 
      title="AI助手" 
      width="65vw"
      custom-class="ai-chat-dialog"
      @close="handleDialogClose"
    >
      <div class="ai-chat-container">
        <!-- 打字动画 -->
        <div 
          v-for="(message, index) in chatMessages" 
          :key="index" 
          class="chat-message-wrapper"
        >
          <div 
            :class="[
              'chat-message', 
              message.sender === 'AI' ? 'ai-message' : 'user-message',
              { 'typing-animation': message.isTyping }
            ]"
          >
            <span 
              v-if="message.sender === 'AI' && message.isTyping" 
              class="typing-indicator"
            >
              AI is thinking...
            </span>
            <span v-else>{{ message.text }}</span>
            <button 
              v-if="!message.isTyping" 
              class="copy-btn" 
              @click="copyMessage(message.text)"
            >
              📋
            </button>
          </div>
        </div>

        <!-- Message Input Area -->
        <div class="input-container">
          <el-input 
            v-model="userInput" 
            placeholder="输入对话..." 
            @keyup.enter="sendMessage"
            clearable
            class="chat-input"
          >
            <template #suffix>
              <el-button 
                type="primary" 
                @click="sendMessage" 
                :disabled="userInput.trim() === ''"
                class="send-btn"
              >
                发送
              </el-button>
            </template>
          </el-input>
        </div>
      </div>

      <!-- Dialog Footer -->
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="clearChat" type="warning" plain>清空聊天框</el-button>
          <el-button @click="dialogVisible = false">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { UserFilled } from "@element-plus/icons-vue";
import { ref } from "vue";
import { ElDialog, ElInput, ElButton, ElMessage } from "element-plus";
import { getAiAnswer } from '../api/AiApi';

export default {
  name: "AiButton",
  components: {
    UserFilled,
    ElDialog,
    ElInput,
    ElButton,
  },
  data() {
    return {
      isDragging: false,
      buttonPositionY: window.innerHeight - 200, // Default position
      startY: 0,
      currentY: 0,
      dialogVisible: false,
      userInput: "",
      chatMessages: [],
      loading: false,
      darkMode: false,
    };
  },
  mounted() {
    this.initDrag();
    this.loadChatHistory();
    this.initThemeDetection();
  },
  methods: {
    initDrag() {
      const dragElement = document.getElementById("dragElement");

      const handleMouseMove = (event) => {
        this.isDragging = true;
        this.currentY = event.clientY;
        const distance = this.currentY - this.startY;

        // Update button position with boundary checks
        const viewportHeight = window.innerHeight;
        this.buttonPositionY = Math.max(
          0, 
          Math.min(this.buttonPositionY + distance, viewportHeight - 50)
        );

        this.startY = this.currentY;
      };

      const handleMouseUp = () => {
        this.isDragging = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        this.saveDragPosition();
      };

      dragElement.addEventListener("mousedown", (event) => {
        this.startY = event.clientY;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      });
    },

    saveDragPosition() {
      localStorage.setItem('aiButtonPosition', this.buttonPositionY);
    },

    loadDragPosition() {
      const savedPosition = localStorage.getItem('aiButtonPosition');
      if (savedPosition) {
        this.buttonPositionY = parseInt(savedPosition);
      }
    },

    initThemeDetection() {
      // Detect system dark mode
      this.darkMode = window.matchMedia && 
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    },

    handleClick() {
      if (!this.isDragging) {
        this.dialogVisible = true;
      }
    },

    handleDialogClose() {
      this.saveChatHistory();
    },

    copyMessage(text) {
      try {
        // Fallback method for copying text
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        ElMessage({
          message: 'Message copied!',
          type: 'success',
          duration: 1500
        });
      } catch (err) {
        ElMessage({
          message: 'Failed to copy message',
          type: 'error',
          duration: 1500
        });
        console.error('Copy failed', err);
      }
    },

    clearChat() {
      this.chatMessages = [];
      localStorage.removeItem('chatHistory');
      ElMessage({
        message: 'Chat cleared!',
        type: 'info',
        duration: 1500
      });
    },

    saveChatHistory() {
      // Save last 50 messages to prevent excessive storage
      const recentMessages = this.chatMessages.slice(-50);
      localStorage.setItem('chatHistory', JSON.stringify(recentMessages));
    },

    loadChatHistory() {
      const savedHistory = localStorage.getItem('chatHistory');
      if (savedHistory) {
        this.chatMessages = JSON.parse(savedHistory);
      }
    },

    async fetchAiAnswer(userInput) {
      try {
        const response = await getAiAnswer(userInput);
        return response.answer;
      } catch (error) {
        console.error("Failed to get reply", error);
        return "Sorry, I couldn't process your request. Please try again.";
      }
    },

    async sendMessage() {
      if (this.userInput.trim() === "") return;

      // Add user message
      const userMessage = { 
        sender: "User", 
        text: this.userInput,
        timestamp: Date.now()
      };
      this.chatMessages.push(userMessage);

      // Add loading indicator
      const loadingMessage = { 
        sender: "AI", 
        text: "AI is thinking...",
        isTyping: true 
      };
      this.chatMessages.push(loadingMessage);

      // Clear input
      const userQuery = this.userInput;
      this.userInput = "";

      // Fetch AI response
      const aiResponse = await this.fetchAiAnswer(userQuery);

      // Replace loading message with actual response
      this.chatMessages = this.chatMessages.map(msg => 
        msg.isTyping 
          ? { sender: "AI", text: aiResponse, timestamp: Date.now() } 
          : msg
      );

      // Auto-scroll to bottom
      this.$nextTick(() => {
        const container = document.querySelector('.ai-chat-container');
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },
  },
};
</script>

<style scoped>
/* Base Styles */
.side-btn-box {
  position: fixed;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #409eff, #3a6fff);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.side-btn-box:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
}

.side-btn-box.is-dragging {
  opacity: 0.7;
}

/* Chat Dialog Styles */
.ai-chat-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 500px;
  overflow-y: auto;
  padding: 10px;
}

.chat-message-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.chat-message {
  position: relative;
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 15px;
  line-height: 1.4;
  word-break: break-word;
  transition: all 0.3s ease;
}

.ai-message {
  background: linear-gradient(145deg, #f0f0f0, #e0e0e0);
  color: #333;
  align-self: flex-start;
  border-bottom-left-radius: 5px;
}

.user-message {
  background: linear-gradient(145deg, #409eff, #3a6fff);
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 5px;
}

.copy-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  opacity: 0.3;
  transition: opacity 0.2s;
}

.copy-btn:hover {
  opacity: 1;
}

.input-container {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.chat-input {
  flex-grow: 1;
}

.send-btn {
  margin-left: 10px;
}

.typing-animation {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.dialog-footer {
  display: flex;
  justify-content: space-between;
}
</style>