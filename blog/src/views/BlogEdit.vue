<template>
  <div>
    <span id="header">
      <Header></Header>
    </span>
    <el-form
      :model="editForm"
      :rules="rules"
      ref="editForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="editForm.title"></el-input>
      </el-form-item>
      <el-form-item label="摘要" prop="description">
        <el-input type="textarea" v-model="editForm.description"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <mavon-editor v-model="editForm.content"></mavon-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('editForm')">
          立即创建
        </el-button>
        <el-button @click="resetForm('editForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
export default {
  name: 'BlogEdit',
  components: {
    Header,
  },
  data() {
    return {
      editForm: {
        id: null,
        title: '',
        description: '',
        content: '',
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          {
            min: 3,
            max: 25,
            message: '长度在 3 到 25 个字符',
            trigger: 'blur',
          },
        ],
        description: [
          { required: true, message: '请输入摘要', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          this.$axios
            .post('/blog/edit', this.editForm, {
              headers: {
                Authorization: localStorage.getItem('token'),
              },
            })
            .then((res) => {
              this.$alert('操作成功', '提示', {
                confirmButtonText: '确定',
                callback: (action) => {
                  this.$router.push('/blogs')
                },
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
  created() {
    const blogId = this.$route.params.blogId
    if (blogId) {
      this.$axios.get('/blog/' + blogId).then((res) => {
        const blog = res.data.data
        // console.log(blog)
        this.editForm.id = blog.id
        this.editForm.title = blog.title
        this.editForm.description = blog.description
        this.editForm.content = blog.content
      })
    }
  },
}
</script>

<style></style>
