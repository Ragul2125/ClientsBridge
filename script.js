// script.js
class ChatDashboard {
  constructor() {
    this.conversationList = document.getElementById("conversationList");
    this.messageArea = document.getElementById("messageArea");
    this.chatHeader = document.getElementById("chatHeader");
    this.activeConversation = null;
    this.init();
  }

  async init() {
    try {
      const conversations = await this.fetchConversations();
      this.renderConversationList(conversations);
    } catch (error) {
      console.error("Error initializing dashboard:", error);
    }
  }

  async fetchConversations() {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/admin/conversations/getconversations`
      );
      console.log(import.meta.env.VITE_BACKEND_URL);
      
      const data = await response.json();
      return data.conversations;
    } catch (error) {
      console.error("Error fetching conversations:", error);
      return [];
    }
  }

  async fetchConversationMessages(conversationId) {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/admin/conversations/getconversations/${conversationId}`
      );
      const data = await response.json();
      return data.conversation;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return null;
    }
  }

  renderConversationList(conversations) {
    this.conversationList.innerHTML = conversations
      .map(
        (conv) => `
            <div class="conversation-item" data-id="${conv.conversationId}">
                <div class="user-info">
                    <img src="${
                      conv.participants.sender.profilePic
                    }" alt="Avatar" class="user-avatar">
                    <div class="user-details">
                        <div class="user-name">${
                          conv.participants.sender.name
                        }</div>
                        <div class="user-role">${
                          conv.participants.sender.role
                        }</div>
                    </div>
                </div>
                <div class="last-message">
                    ${
                      conv.lastMessage
                        ? conv.lastMessage.text
                        : "No messages yet"
                    }
                </div>
            </div>
        `
      )
      .join("");

    this.addConversationListeners();
  }

  renderMessages(conversation) {
    this.chatHeader.innerHTML = `
            <h3>Chat with ${conversation.participants.sender.name}</h3>
        `;

    this.messageArea.innerHTML = conversation.messages
      .map(
        (msg) => `
            <div class="message ${
              msg.msgByUserId === conversation.participants.sender.id
                ? "sender"
                : "receiver"
            }">
                <div class="message-content">
                    ${msg.text}
                </div>
                <div class="timestamp">
                    ${new Date(msg.createdAt).toLocaleString()}
                </div>
            </div>
        `
      )
      .join("");

    this.messageArea.scrollTop = this.messageArea.scrollHeight;
  }

  addConversationListeners() {
    const items = document.querySelectorAll(".conversation-item");
    items.forEach((item) => {
      item.addEventListener("click", async () => {
        // Remove active class from all items
        items.forEach((i) => i.classList.remove("active"));
        // Add active class to clicked item
        item.classList.add("active");

        const conversationId = item.dataset.id;
        const conversation = await this.fetchConversationMessages(
          conversationId
        );
        if (conversation) {
          this.renderMessages(conversation);
        }
      });
    });
  }
}

// Initialize the dashboard when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new ChatDashboard();
});
