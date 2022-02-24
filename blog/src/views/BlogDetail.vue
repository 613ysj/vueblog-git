<template>
  <div>
    <span id="header">
      <Header></Header>
    </span>
    <div class="mblog">
      <h2>{{ blog.title }}</h2>
      <el-divider>
        <i class="el-icon-mobile-phone"></i>
        <router-link
          v-if="ownBlog"
          :to="{ name: 'BlogEdit', params: { blogId: blog.id } }"
        >
          编辑
        </router-link>
      </el-divider>
      <div class="content markdown-body" v-html="blog.content"></div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import 'github-markdown-css/github-markdown.css'
export default {
  name: 'BlogDetail',
  components: {
    Header,
  },
  data() {
    return {
      blog: {
        id: null,
        userId: null,
        title: 'sssss',
        description: '',
        content: '',
      },
      ownBlog: false,
    }
  },

  created() {
    const blogId = this.$route.params.blogId
    if (blogId) {
      this.$axios.get('/blog/' + blogId).then((res) => {
        const blog = res.data.data
        // console.log(blog)
        this.blog.id = blog.id
        this.blog.title = blog.title
        this.blog.description = blog.description
        this.blog.userId = blog.userId

        var MarkdownIt = require('markdown-it')
        var md = new MarkdownIt()
        var result = md.render(blog.content)

        this.blog.content = result
        //判断是否是自己的文章，有权限编辑
        this.ownBlog = this.blog.userId === this.$store.getters.getUser.id
        // console.log(this.blog.userId)
        // console.log(this.$store.getters.getUser.id)
      })
    }
  },
}
</script>

<style scoped>
.mblog {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 800px;
  padding: 20px 15px;
}
</style>
