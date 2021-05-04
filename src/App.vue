<template>
  <div id="app">
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
import axios from "./axiosAuth";

export default {
  data() {
    return {
      name: "",
      comment: "",
      posts: []
    }
  },
  created() {
    axios.get("/comments")
    .then(responce => {
      this.posts = responce.data.documents;
    });
  },
  methods: {
    createComment() {
      axios
        .post("/comments", {
          fields: {
            name: {
              stringValue: this.name
            },
            comment: {
              stringValue: this.comment
            }
          }
        })
        .then(responce => {
          console.log(responce);
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
