<template>
    <div>
      <!-- Side button -->
      <div 
        class="side_btn_box" 
        :style="{ cursor: isDragging ? 'move' : 'pointer' }" 
        id="dragElement"
        @click="handleClick"
      >
        <el-icon :size="20" color="white">
          <UserFilled />
        </el-icon>
      </div>
  
      <!-- Dialog Popup -->
      <el-dialog 
        v-model="dialogVisible" 
        title="AI Chat" 
        width="65vw"
        @close="handleDialogClose"
      >
        <div class="ai-chat-container">
          <div v-for="(message, index) in chatMessages" :key="index" class="chat-message">
            <p :class="{'ai-message': message.sender === 'AI', 'user-message': message.sender === 'User'}">
              {{ message.text }}
            </p>
          </div>
          <el-input 
            v-model="userInput" 
            placeholder="Type your question..." 
            @keyup.enter="sendMessage"
            clearable
          ></el-input>
          <el-button type="primary" @click="sendMessage" class="send-btn">Send</el-button>
        </div>
  
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Close</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import { UserFilled } from "@element-plus/icons-vue";
  import { ref } from "vue";
  import { ElDialog, ElInput, ElButton } from "element-plus";
  import axios from "axios";
  import { getAiAnswer } from '../api/AiApi'
  
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
        startY: 0,
        currentY: 0,
        dialogVisible: false,
        userInput: "",
        chatMessages: [],
        loading: false, // Track loading state
      };
    },
    mounted() {
      this.initDrag();
    },
    methods: {
      initDrag() {
        const dragElement = document.getElementById("dragElement");
  
        const handleMouseMove = (event) => {
          this.isDragging = true;
          this.currentY = event.clientY;
          const distance = this.currentY - this.startY;
  
          let currentTop = parseInt(dragElement.style.top) || dragElement.offsetTop || 0;
          const viewportHeight = window.innerHeight;
  
          // Boundary checks
          if (currentTop <= 0) {
            currentTop = 0;
          } else if (currentTop + 40 > viewportHeight) {
            currentTop = viewportHeight - 40;
          }
  
          dragElement.style.top = currentTop + distance + "px";
          this.startY = this.currentY;
        };
  
        const handleMouseUp = () => {
          this.isDragging = false;
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };
  
        dragElement.addEventListener("mousedown", (event) => {
          this.startY = event.clientY;
          document.addEventListener("mousemove", handleMouseMove);
          document.addEventListener("mouseup", handleMouseUp);
        });
      },
      handleClick() {
        // Trigger the dialog when the button is clicked
        this.dialogVisible = true;
        console.log("dialogVisible: " + this.dialogVisible);
      },
      handleDialogClose() {
        console.log("Dialog closed");
      },
  
      async fetchAiAnswer(userInput) {
        try {
          const response = await getAiAnswer(userInput);
          console.log(response.answer);
          return response.answer;
        } catch (error) {
          console.error("Failed to get reply", error);
        }
      },
      async sendMessage() {
        if (this.userInput.trim() === "") return;
  
        // Add the user message to the chat
        this.chatMessages.push({ sender: "User", text: this.userInput });
  
        // Show loading message
        this.chatMessages.push({ sender: "AI", text: "AI is thinking..." });
  
        // Set loading state to true
        this.loading = true;
  
        // Fetch AI response
        const aiResponse = await this.fetchAiAnswer(this.userInput);
  
        // Replace loading message with the actual AI response
        this.chatMessages[this.chatMessages.length - 1].text = aiResponse;
  
        // Clear input
        this.userInput = "";
  
        // Set loading state to false
        this.loading = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .side_btn_box {
    position: fixed;
    right: 20px;
    bottom: 100px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #409eff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 3000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .side_btn_box:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }
  
  .side_btn_box .el-icon {
    transition: all 0.3s ease;
  }
  
  .side_btn_box:active {
    transform: scale(1);
  }
  
  .el-dialog {
    min-width: 500px;
  }
  
  .ai-chat-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 400px;
    overflow-y: auto;
  }
  
  .chat-message {
    padding: 5px;
    border-radius: 10px;
    max-width: 80%;
  }
  
  .ai-message {
    background-color: #f0f0f0;
    align-self: flex-start;
  }
  
  .user-message {
    background-color: #409eff;
    color: white;
    align-self: flex-end;
  }
  
  .el-input {
    margin-bottom: 10px;
  }
  
  .send-btn {
    align-self: flex-end;
  }
  </style>
  