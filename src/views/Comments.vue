<template>
  <div>
    <h3>Posting on the Board</h3>
    <label for="name" >Username: </label>
    <input id="name" type="text" v-model="name">
    <br><br>
    <label for="comment">Comment: </label>
    <textarea id="comment" v-model="comment"></textarea>
    <br><br>
    <button @click="createComment">Submit</button>
    <h2>Board</h2>
    <div v-for="post in posts" :key="post.name">
      <div>Username: {{ post.fields.name.stringValue }}</div>
      <div>Comment: {{ post.fields.comment.stringValue }}</div>
      <br>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      comment: "",
      posts: []
    };
  },
  computed: {
    idToken() {
      return this.$store.getters.idToken;
    }
  },
  created() {
    axios.get("/comments", {
      headers: {
        Authorization: `Bearer ${this.idToken}`
      }
    })
    .then(response => {
      this.posts = response.data.documents;
    });
  },
  methods: {
    createComment() {
      axios.post("/comments", {
            fields: {
              name: {
                stringValue: this.name
              },
              comment: {
                stringValue: this.comment
              }
            }
          }, {
            headers: {
              Authorization: `Bearer ${this.idToken}`
            }
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);

          });
      this.name = "";
      this.comment = "";
    }
  }
}
</script>