<template>
    <div class="manager-view">
        <div class="manager-info">
            <img class="avatar" :src="data.NEWPHOTOURL" alt="" srcset="">
            <div class="base-info">
                <span>{{data.MGRNAME}}</span>
                <span class="type">{{MFTYPE}}</span>
            </div>
        </div>
        <div class="profit-info">
            <span>年化收益：<b>{{YIELDSE}}%</b></span>
            <span>最大回撤：<b>{{FMAXRETRA1}}%</b></span>
        </div>
    </div>
</template>
<script>
import { fundType } from '@/utils/enum.js'

export default {
    props: {
        data: Object
    },
    computed: {
        YIELDSE() {
            return this.data.YIELDSE && parseFloat(this.data.YIELDSE).toFixed(2)
        },
        FMAXRETRA1() {
            return this.data.FMAXRETRA1 && parseFloat(this.data.FMAXRETRA1 * 100).toFixed(2)
        },
        MFTYPE() {
            const key = Object.keys(fundType)[this.data.MFTYPE - 1]
            return fundType[key]
        }
    }
}
</script>
<style lang="less" scoped>
.manager-view{
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.12rem 0.14rem;
    width: 100%;
    background-color: #ffffff;
    margin-bottom: 0.12rem;
    overflow: hidden;
    .manager-info{
        display: flex;
        align-items: center;
        font-size: 0.14rem;
        color: #999999;
        .avatar{
            width: 0.54rem;
            height: 0.68rem;
            margin-right: 0.12rem;
        }
        .base-info{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-right: 0.12rem;
            font-size: 0.16rem;
            color: #333333;
            .type{
                font-size: 0.14rem;
                color: #52a2ff;
            }
        }
    }
    .profit-info{
        display: flex;
        flex-direction: column;
        margin-right: 0.12rem;
        b{
            font-size: 0.18rem;
            color: #ff0000;
        }
    }
}
</style>