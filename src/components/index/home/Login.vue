<template>
    <div class="box"> 
        <div class="box-title warning-bg"><i class="el-icon-edit mr-15"></i>登陆</div>
        <div class="box-content">
            <el-form :model="loginAccount" label-width="54px" class="block-center">
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="loginAccount.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginAccount.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-radio class="radio" v-model="loginAccount.type" label="1">学生</el-radio>
                    <el-radio class="radio" v-model="loginAccount.type" label="2">教师</el-radio>
                    <el-radio class="radio" v-model="loginAccount.type" label="3">管理员</el-radio>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="login">登录</el-button>
                    <el-button @click="loginAccount.password ='';loginAccount.username=''">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'

    export default {
        data() {
            return { 
                loginAccount: {
                    username: '',
                    password: '',
                    type: ''
                }
            }
        },
        computed : mapGetters({
            currentAccount :  'getCurrentAccount'
        }),
        methods: {
            login() {
                console.log(this)
                if(this.loginAccount.username == '') {
                    this.$message.error('请输入用户名！');
                } else  if(this.loginAccount.password == ''){
                    this.$message.error('请输入密码  ！');
                } else  if(this.loginAccount.type == ''){
                    this.$message.error('请选择类型！');
                } else {
                    this.$store.dispatch('fetchAccount', {'data': this.loginAccount});
                }
            }
        },
        watch: {
            currentAccount: {   
                handler: function(newValue, oldValue){
                    if(newValue && newValue.id != ''){
                        this.$router.push('../admin')
                        this.$store.dispatch('changeLoginStatus');
                    } else {
                        this.$message.error('输入的密码、账号或类型不正确！');                        
                    }
                },
                deep: true
            },
        }
    }
</script>