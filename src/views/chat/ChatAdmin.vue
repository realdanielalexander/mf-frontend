<template>
  <div style="width: 100%">
    <v-app style="">
      <v-container class="chat-app" style="width: 50%">
        <v-card class="d-flex flex-row">
          <div style="width: 25%">
            <!---/Left chat list -->
            <div class="px-3 border-bottom">
              <v-text-field
                placeholder="Search contact"
                class="mb-0 mt-0"
                v-model="handleSearchInput"
              ></v-text-field>
            </div>
            <v-list nav class="hightauto">
              <v-list-item
                v-for="(conversation, i) in filteredList"
                :key="i"
                @click="(e) => openMessages(conversation, e)"
                :class="isActive ? 'active' : 's'"
              >
                <v-avatar size="42" class="mr-3"
                  ><img
                    :src="
                      require(`@/${conversation.image}`)
                    "
                    :alt="conversation.image"
                /></v-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    <h6>{{ conversation.name }}</h6>
                    <!-- <span class="caption">{{ conversation.lastMessage }}</span> -->
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
          <!---/Left chat list -->
          <!---right chat conversation -->
          <div class="chat-right-part">
            <template v-if="conversation">
              <!---conversation header-->
              <div class="chat-topbar d-flex px-3 py-3 align-center">
                <div>
                  <v-app-bar-nav-icon
                    @click.stop="drawer = !drawer"
                    class="d-block d-lg-none mr-2"
                  />
                </div>
                <!-- <v-avatar size="42" class="mr-3"
                  ><img
                    :src="
                      require(`@/${conversation.image}`)
                    "
                    width="37"
                /></v-avatar> -->
                <div class="user-about">
                  <h6>{{ conversation.name }}</h6>
                </div>
              </div>
              <!---conversation header-->
              <!---Chat Room-->
              <div class="">
                <div class="chat-room px-3 py-3">
                  <div
                    class="d-flex align-center mb-3"
                    light
                    v-for="message in conversation.messages"
                    :key="message.id"
                    :class="{ fromMe: message.fromMe, messageItem: true }"
                  >
                    <div class="thumb">
                      <!-- <v-avatar size="37" class="mx-2" v-if="message.fromMe"
                        ><img src="@/assets/images/users/6.jpg" alt="..."
                      /></v-avatar>
                      <v-avatar size="37" class="mx-2" v-else
                        ><img
                          :src="
                            require(`@/${conversation.image}`)
                          "
                          alt="..."
                        />
                      </v-avatar> -->
                    </div>
                    <v-chip :color="message.fromMe ? 'primary' : ''">{{
                      message.text
                    }}</v-chip>
                  </div>
                </div>
              </div>
              <!---Chat Room-->
              <div class="pa-3 border-top">
                <v-textarea
                  name="input-4-1"
                  rows="2"
                  placeholder="Type and hit Enter"
                  @keydown="addMessage"
                ></v-textarea>
              </div>
            </template>
            <template v-else>
              <div class="d-flex justify-center hightauto align-center">
                <h4>Start conversation</h4>
              </div>
            </template>
          </div>
          <!---right chat conversation -->
        </v-card>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import Vue from "vue";
import io from "socket.io-client";
import axios from "axios";
import moment from "moment";

export default {
  name: "Chat",
  components: {},
  props: ["currentCustomerId"],
  data: () => ({
    socket: null,
    drawer: true,
    doNotClose: true,
    handleSearchInput: "",
    usersList: [],
    chatUserActive: true,
    conversation: "",
    sendMessage: " ",
    isActive: false,
    windowWidth: window.innerWidth,
  }),

  methods: {
    selectedchat: function () {
      this.isActive = !this.isActive;
      // some code to filter users
    },
    openMessages(conversation) {
      Vue.set(this, "conversation", conversation);
      
      // Fetch chat with particular person
      this.fetchChats(conversation.id);
    },

    addMessage(e) {
      if (e.key === "Enter" && e.target.value) {
        const value = {
          text: e.target.value,
          fromMe: true,
        };
        this.socket.emit(
          "message",
          JSON.stringify({
            customerIdTo: this.conversation.id,
            customerIdFrom: 0,
            text: e.target.value,
            fromMe: true,
          })
        );

        Vue.set(
          this,
          "conversation",
          Object.assign({}, this.conversation, {
            messages: [...(this.conversation.messages || []), value],
          })
        );
        
        this.postChat({
          text: e.target.value,
          customer_id_to: this.conversation.id
        });
        e.target.value = "";
      }
    },

    addMessageFromOthers(message) {
      var messageJson = JSON.parse(message);
      if (
        parseInt(messageJson.customerIdTo) == 0 && parseInt(messageJson.customerIdFrom) == this.currentCustomerId
      ) {
        messageJson.fromMe = false;

        Vue.set(
          this,
          "conversation",
          Object.assign({}, this.conversation, {
            messages: [...(this.conversation.messages || []), messageJson],
          })
        );
      }
    },

    handleWindowResize(event) {
      this.windowWidth = event.currentTarget.innerWidth;
      this.setSidebarWidth();
    },
    setSidebarWidth() {
      this.chatSidebarActive = this.doNotClose = true;
    },

    initSocket() {
      let _this = this;
      this.socket = io("http://localhost:8080/", {
        transports: ["websocket"],
        upgrade: false,
      });
      this.socket.on("message", function (message) {
        _this.addMessageFromOthers(message);
      });
    },

    async fetchChats(customerId) {
      try {
        const res = await axios.get("/chats/" + customerId);
        
        let resultAddedFromMe = res.data.map(chat => ({
          id: chat.id,
          text: chat.text,
          fromMe: chat.customer_id_from == 0 || chat.customer_id_to == customerId ? true : false
        }));

        Vue.set(
          this,
          "conversation",
          Object.assign({}, this.conversation, {
            // messages: [...(this.conversation.messages || []), value],
            messages: resultAddedFromMe,
          })
        );
      } catch (error) {
        // this.usersList = [];
      }
    },
    async fetchCustomers() {
      try {
        const res = await axios.get("/customers");
        console.log(res.data);
        this.usersList = res.data;
        // this.usersList = res.data;
      } catch (error) {
        // this.usersList = [];
      }
    },

    async postChat(message) {
      var chat = {
        customer_id_from: 0,
        customer_id_to: message.customer_id_to,
        text: message.text,
        datetime: moment(Date.now()).format("YYYY-MM-DDTHH:mm:ssZ"),
      };
      await axios.post("/chats", chat);
    },
  },

  computed: {
    filteredList() {
      return this.usersList.filter((user) => {
        return user.name
          .toLowerCase()
          .includes(this.handleSearchInput.toLowerCase());
      });
    },
  },

  mounted() {
    this.initSocket();
    this.fetchCustomers();
  },
  created() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.handleWindowResize);
    });
    this.setSidebarWidth();
  },
  beforeDestroy: function () {
    window.removeEventListener("resize", this.handleWindowResize);
  },
};
</script>
<style lang="scss">
.chat-app {
  overflow: hidden;
  .v-navigation-drawer__border {
    width: 0px;
  }
  .chat-right-part {
    width: 100%;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    .chat-topbar {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
  .chat-room {
    min-height: calc(100vh - 385px);
    .fromMe {
      -webkit-box-pack: start;
      -ms-flex-pack: start;
      justify-content: flex-start;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: reverse;
      -ms-flex-direction: row-reverse;
      flex-direction: row-reverse;
    }
  }
  .hightauto {
    min-height: calc(100vh - 360px);
  }
}
</style>