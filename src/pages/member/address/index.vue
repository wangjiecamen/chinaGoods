<template>
    <div class='container'>
        <div class="title">
            <span>{{$t('reciveAddress')}}</span>
        </div>
        <el-form :model="form" ref="form" :rules="rules" style="padding: 30px 40% 190px 20px" :label-width="labelWidth">
            <el-form-item :label="$t('addr.username')" prop="user_name">
                <el-input v-model="form.user_name" :placeholder="$t('addr.nameRule')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('addr.IDnumber')" prop="user_number">
                <el-input v-model="form.user_number" :placeholder="$t('addr.IDnumRule')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('addr.receiveName')" prop="receiver_name">
                <el-input v-model="form.receiver_name" :placeholder="$t('addr.receiveNameRule')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('addr.telephone')" prop="phoneno">
                <el-input :placeholder="$t('addr.pheRule')" v-model="form.phoneno">
                    <template slot="prepend">+86</template>
                </el-input>
            </el-form-item>
            <el-form-item :label="$t('addr.area')" prop="workarea">
                <el-cascader :options="areaList" change-on-select v-model="form.workarea" expand-trigger="hover"
                    @change="handleChange" class="area" :placeholder="$t('addr.areaRule')"></el-cascader>
            </el-form-item>
            <el-form-item :label="$t('addr.detailAddress')" prop="address">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 3}" :placeholder="$t('addr.detailAddrRule')" v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="mini" type="danger" @click="changeAddress">{{$t('addr.save')}}</el-button>
            </el-form-item>
        </el-form>
        <!-- <address-table :tableData="tableData" @updateAddress="handleUpdateAddress" @deleteAddress="handleDeleteAddress"
         @defaultAddress="handleDefaultAddress"></address-table>
        <update-address :dialogTableVisible="isShow" :title="dialogTitle" @submitForm="changeAddress"
         @close="noModel" :form="formList" :options="areaList"></update-address> -->
    </div>
</template>
<script>
// import addressTable from '@/pages/member/address/components/table'
// import updateAddress from '@/pages/member/address/components/updateAddress'
import AddressModel from "@/model/address"
export default {
    components: {

    },
    props: {

    },
    data() {
        return{
            isShow: false,
            areaList: [],//地区列表
            dialogTitle: '',
            form: {},
            tableData: [],//表格数据
            addressId: null,
            rules: {
                user_name: [
                { required: true, message: "请填写联系人姓名", trigger: "blur" }
                ],
                user_number: [
                    //暂不做验证，身份证和护照没区分
                { required: true, message: "请正确填写证件号码", trigger: "blur" }
                ],
                receiver_name: [
                { required: true, message: "请填写收货人姓名", trigger: "blur" }
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
      labelWidth () {
        let lang = this.$store.getters['app/language']
        if (lang === 'zh') {
          return '120px'
        } else if (lang === 'en') {
          return '180px'
        }
      }
    },
    watch: {

    },
    mounted() {
        this.getArea()
        this.getAddressList()
    },
    destroyed() {

    },
    methods: {
        handleUpdateAddress(res) {
            this.isShow = true
            this.getAddressDetail(res)
            this.dialogTitle = '修改地址'
            this.formList.type = 0
        },
        handleDeleteAddress(res) {
            this.$confirm('删除后地址无法恢复，确认删除吗？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                this.deleteAddress(res)
            }).catch(() => {

            })
        },
        handleDefaultAddress(res) {
            console.log(res)
        },
        changeAddress() {
            this.$refs.form.validate( async valid => {
                if(valid) {
                    const types = this.addressId ? 'editAddress' : 'createAddress'
                    const message = this.addressId ? '修改成功' : '新建成功'
                    //此处对地址集合做拆分
                    this.form.country_id = this.form.workarea[0]
                    this.form.province_id = this.form.workarea[1]
                    this.form.city_id = this.form.workarea[2]
                    this.form.district_id = this.form.workarea[3]
                    const options = {
                        data: this.form,
                        id: this.addressId
                    }
                    try {
                        await AddressModel[types](options)
                        this.$message.success(message)
                        this.getAddressList()
                    } catch(err) {
                        console.log(err)
                    }
                } else {
                    console.log(this.form)
                }

            })

        },
        noModel(res) {
            this.isShow = res
        },
        add() {
            this.isShow = true
            this.dialogTitle = '新增地址'
            this.formList.type = 1
        },
        handleChange(e) {
            this.form.workarea = e
            console.log(this.form)
        },
        changeArr(arr) {
            if(arr.length > 0) {
                arr.map( item => {
                    item.value = item.id
                    item.label = item.name
                    if(item.sub){
                        item.children = item.sub
                        this.changeArr(item.children)
                    }
                })
            }else{
                return
            }
        },
         //获取地区
        async getArea() {
            const options = {
            }
            try {
                const areaList = await AddressModel.getArea(options)
                this.changeArr(areaList)
                this.areaList = areaList
            } catch(err) {
                console.log(err)
            }
        },
        //获取用户地址
        async getAddressList() {
            const options = {
            }
            try {
                const List = await AddressModel.getAddressList(options)
                const addressList = List.data
                if(addressList.length > 0) {
                    this.addressId = addressList[0].id
                    this.getAddressDetail(this.addressId)
                }
                //此方法对收货地址的拼接
                addressList.map( item => {
                    const country = item.country && item.country.name
                    const province = item.province && item.province.name
                    const city = item.city && item.city.name
                    const district = item.district && item.district.name
                    const address = item.address
                    const arr = [country, province, city, district, address]
                    let str = ''
                    arr.map( pre => {
                        if(pre) {
                            str += pre
                        }
                    })
                    item.location = str
                })

                this.tableData = addressList
            } catch(err) {
                console.log(err)
            }
        },
        //获取地址详情
        async getAddressDetail(id) {
            const options = {
                id: id
            }
            try {
                const addressDetail = await AddressModel.getAddressDetail(options)
                const createArr = Array(
                  addressDetail.country && addressDetail.country.id,
                  addressDetail.province && addressDetail.province.id,
                  addressDetail.city && addressDetail.city.id,
                  addressDetail.district && addressDetail.district.id
                )
                this.form = addressDetail
                this.form.workarea = createArr
            } catch(err) {
                console.log(err)
            }
        },
        //删除地址
        async deleteAddress(id) {
            const options = {
                id: id
            }
            try {
                const addressDetail = await AddressModel.deleteAddress(options)
                this.$message.success("删除成功")
                this.getAddressList()
            } catch(err) {
                console.log(err)
            }
        },
    },
}
</script>

<style lang='scss' scoped>
.container{
    .title{
        border-bottom: 1px solid #E5E5E5;
        padding-bottom: 10px;
        span{
            height: 40px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            line-height: 40px;
            font-size: 18px;
            font-weight: 600;
            color: #000000;
        }
    }
    .area{
        width: 100%;
    }
    /deep/{
        .el-form-item__content::after{
            clear: none;
        }
        .el-form-item::after{
            clear: none;
        }
    }
}
</style>
