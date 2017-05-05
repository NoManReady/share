<template>
  <div class="login-container">
    <div class="form-box">
      <i-form ref="loginForm" :model="loginForm" :rules="rules" :label-width="80">
        <Form-item class="mt10" prop="userCode">
          <i-input type="text" v-model="loginForm.userCode" size="large" placeholder="账号">
            <Icon type="ios-person-outline" slot="prepend" style="padding:0 10px;"></Icon>
          </i-input>
        </Form-item>
        <Form-item cla prop="passwd">
          <i-input type="password" v-model="loginForm.passwd" size="large" placeholder="密码">
            <Icon type="ios-locked-outline" slot="prepend" style="padding:0 10px;"></Icon>
          </i-input>
        </Form-item>
        <Form-item cla>
          <Button type="primary" :loading="loading" long @click.prev="handleSubmit">
            <span v-if="loading">登录中...</span>
            <span v-else>登录</span>
          </Button>
        </Form-item>
      </i-form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Vue from 'vue'
export default {
  data() {
    // 用户校验
    const validateUserCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('账号不能为空'))
      }
      callback()
    }
    // 密码校验
    const validatePasswd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      }
      callback()
    }

    return {
      loading: false,
      loginForm: {
        userCode: '',
        passwd: ''
      },
      rules: {
        userCode: [
          { validator: validateUserCode, trigger: 'change' }
        ],
        passwd: [
          { validator: validatePasswd, trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.change_title('用户登录')
  },
  methods: {
    ...mapActions(['change_title', 'login']),
    handleSubmit() {
      this.loading = true
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.login(this.loginForm).then(() => {
            this.$Message.success('登录成功!')
            this.$router.push('/home')
          }).catch(() => {
            this.loginForm.userCode = ''
            this.loginForm.passwd = ''
            this.$nextTick(()=>{
              this.handleReset()
            })
          })
        } else {
          this.$Message.error('表单验证失败!')
        }
        setTimeout(() => {
          this.loading = false
        }, 1000)
      })
    },
    handleReset() {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../scss/mixins';
.login-container {
  @include absolute;
  background-position: center top;
  background-image: url('../assets/login/login-bg.png');
  background-repeat: no-repeat;
  text-align: center;
  padding-top: 120px;
  .form-box {
    width: 400px;
    margin: 0 auto;
    .ivu-form-item {
      margin-bottom: 35px;
    }
  }
}
</style>