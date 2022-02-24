<template>
  <div>
    <h3>欢迎来到一米八的赛杰的博客</h3>
    <div class="block">
      <el-avatar :size="50" :src="user.avatar"></el-avatar>
      <div>
        {{ user.username }}
      </div>
    </div>
    <el-link type="primary" href="/blogs">主页</el-link>
    <span v-show="hasLogin">
      <el-divider direction="vertical"></el-divider>
      <el-link type="success" href="/blog/add">
        发表文章
      </el-link>
    </span>
    <el-divider direction="vertical"></el-divider>
    <span v-show="!hasLogin">
      <el-link type="info" href="/login">登录</el-link>
    </span>
    <span v-show="hasLogin">
      <el-link type="info" @click="logout">退出</el-link>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      hasLogin: false,
      user: {
        username: '请先登录',
        avatar:
          'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      },
      blogs: {},
      currentPage: 1,
      total: 0,
    }
  },
  methods: {
    logout() {
      this.$axios
        .get('/logout', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .then((res) => {
          this.$store.commit('REMOVE_INFO')
          this.$router.push('/login')
        })
    },
  },
  //vue生命周期钩子，
  created() {
    if (this.$store.getters.getUser.username) {
      this.user.username = this.$store.getters.getUser.username
      this.user.avatar = this.$store.getters.getUser.avatar
      this.hasLogin = true
    }
  },
}
</script>

<style></style>
