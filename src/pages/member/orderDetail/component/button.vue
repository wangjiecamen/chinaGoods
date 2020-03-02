<template>
    <div class='container'>
        <el-button size="mini" round @click="goView" v-if="isContainer">{{$t('orderDeatil.viewLogistic')}}</el-button>
        <el-button size="mini" type="danger" plain round @click="receiveGood" v-if="isReceive">{{$t('order.toRecept')}}</el-button>
        <el-button size="mini" type="danger" round @click="toComment" v-if="isComment">{{$t('order.toEvaluate')}}</el-button>
        <el-button size="mini" round v-if="!isComment" @click="toComment">{{$t('rate.myTitle')}}</el-button>
    </div>
</template>

<script>
export default {
    components: {

    },
    props: {
        isContainer: {
            type: Boolean,
            default: false
        },
        isReceive: {
            type: Boolean,
            default: false
        },
        isComment: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return{

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
        goView() {
            this.$emit('goView')
        },
        receiveGood() {
            this.$emit('receiveGood')
        },
        toComment() {
            this.$emit('toComment')
        }
    },
}
</script>

<style lang='scss' scoped>
.container{
    height: 30px;
    width: 100%;
    margin-top: 20px;
    div{
        width: 70px;
        height: 27px;
        float: left;
        line-height: 27px;
        border-radius: 10px;
        text-align: center;
        cursor: pointer;
    }
    .view{
        border: 1px solid #E5E5E5;
    }
    .receive{
        background: #EE201D;
        color: #FFFFFF;
        margin-left: 20px;
    }
    .comment{
        border: 1px solid #FD898A;
        background: #FFF6F6;
        color: #EE201D;
        margin-left: 20px;
    }
}
</style>
