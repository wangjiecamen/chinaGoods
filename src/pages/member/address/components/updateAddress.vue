<template>
    <el-dialog :title="title" :visible="dialogTableVisible" @close="close" center>
        <el-form :model="form" ref="form" :rules="rules">
            <el-form-item label="联系人姓名" prop="receiver_name" :label-width="formLabelWidth">
                <el-input v-model="form.receiver_name" placeholder="请输入联系人姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phoneno" :label-width="formLabelWidth">
                <el-input placeholder="请输入电话号码" v-model="form.phoneno">
                    <template slot="prepend">+86</template>
                </el-input>
            </el-form-item>
            <el-form-item label="所在地区" prop="workarea" :label-width="formLabelWidth">
                <el-cascader :options="options" change-on-select v-model="form.workarea" expand-trigger="hover"
                    @change="handleChange" class="area" placeholder="请输入详细地址"></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="address" :label-width="formLabelWidth">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 3}" placeholder="请输入详细地址" v-model="form.address"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="danger" @click="submitForm">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    components: {

    },
    props: {
        dialogTableVisible: {
            type: Boolean,
            default: false
        },
        form: {
            type: Object
        },
        title: {
            type: String
        },
        options: {
            type: Array
        }
    },
    data() {
        return{
            formLabelWidth: '100px',
            rules: {
                receiver_name: [
                { required: true, message: "请填写联系人姓名", trigger: "blur" }
                ],
                phoneno: [
                { required: true, message: "请填写正确手机号码", pattern: "^1[3456789][0-9]{9}$", trigger: "blur" }
                ],
                workarea: [
                { required: true, message: "请选择地区", trigger: "change" }
                ],
                address: [
                { required: true, message: "请填写详细地址", trigger: "blur" }
                ],
            },
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    destroyed() {

    },
    methods: {
        close() {
            this.$emit("close", false)
        },
        submitForm() {
            console.log(this.form)
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$emit("submitForm", this.form )
                } else {
                    console.log(this.form);
                    console.log("error submit!!");
                    return false;
                }
            })   
        },
        handleChange(e) {
            this.form.workarea = e
            console.log(this.form)
        },
        
    },
}
</script>

<style lang='scss' scoped>
.area{
    width: 100%;
}
</style>
