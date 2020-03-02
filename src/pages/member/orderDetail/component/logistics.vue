<template>
    <el-dialog :title="$t('orderDeatil.logistic')" @close="close" :visible="dialogTableVisible" center>
        <el-timeline :reverse="reverse">
          <template v-if="activities.length">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              placement="top"
              :timestamp="activity.time">
              {{activity.content}}
            </el-timeline-item>
          </template>

          <el-timeline-item v-else>
            --- {{$t('orderDeatil.logisticNews')}} ---
          </el-timeline-item>
        </el-timeline>
    </el-dialog>
</template>

<script>
export default {
    components: {

    },
    props: {
        dialogTableVisible: {
            default: false,
            type: Boolean
        },
        activities: {
            default: Array
        }
    },
    data() {
        return{
            reverse: true,
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
        close(){
            this.$emit("close",false)
        }
    },
}
</script>

<style lang='scss' scoped>

</style>
