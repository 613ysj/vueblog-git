<template>
  <div>
    <span id="header">
      <Header></Header>
    </span>
    <div class="block">
      <el-timeline>
        <!-- 当在组件中使用v-for时，key是必须的 -->
        <el-timeline-item
          placement="top"
          :timestamp="blog.created"
          v-for="blog in blogs"
          :key="blog.id"
        >
          <el-card>
            <h4>
              <router-link
                :to="{ name: 'BlogDetail', params: { blogId: blog.id } }"
              >
                {{ blog.title }}
              </router-link>
            </h4>
            <p>{{ blog.description }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="page"
    ></el-pagination>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
export default {
  components: { Header },
  name: 'Blogs',
  data() {
    return {
      blogs: {},
      currentPage: 1,
      total: 0,
      pageSize: 5,
    }
  },
  methods: {
    page(currentPage) {
      this.$axios.get('/blogs?currentPage=' + currentPage).then((res) => {
        // console.log(res)
        this.blogs = res.data.data.records
        this.total = res.data.data.total
        this.currentPage = res.data.data.current
        this.pageSize = res.data.data.size
      })
    },
  },
  //初始化的时候，直接在mounted（）方法中调用第一页this.page(1)
  mounted() {
    this.page(1)
  },
}
</script>

<style>
#header {
  text-align: center;
}
</style>
