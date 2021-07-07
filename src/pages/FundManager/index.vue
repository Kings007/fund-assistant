<template>
    <div class="fund-manager-view">
        <van-dropdown-menu>
            <van-dropdown-item v-model="state.MFTYPE" :options="option1" />
            <van-dropdown-item v-model="state.sortBy" :options="option2" />
        </van-dropdown-menu>
        <div class="manager-list">
            <fund-manager-item v-for="(item,idx) in state.managerList" :key="idx" :data="item" @click="handleOpenDetail(item)"/>
        </div>
    </div>
</template>
<script>
import { reactive, onMounted, watchEffect } from 'vue'
import { DropdownMenu, DropdownItem } from 'vant'
import FundManagerItem from '@/components/ManagerItem/index.vue'
import { fundType } from '@/utils/enum.js'
import { fetchFundManagerList, fetchFundManagerDetail } from '@/utils/api.js'

export default {
    components: {
        [DropdownMenu.name]: DropdownMenu,
        [DropdownItem.name]: DropdownItem,
        FundManagerItem
    },
    setup() {
        const state = reactive({
            MFTYPE: 1,
            sortBy: 0,
            managerList: []
        })
        const option1 = [
            { text: fundType.bond, value: 1 },
            { text: fundType.stock, value: 2 },
            { text: fundType.index, value: 3 },
            { text: fundType.money, value: 4 }
        ]
        const option2 = [
            { text: '评分排名1-10', value: 0 },
            { text: '评分排名1-50', value: 1 },
            { text: '评分排名1-100', value: 2 },
            { text: '评分排名1-200', value: 3 },
        ]
        const getManagerList = () => {
            const pageSizes = [10, 50, 100, 200]
            const param = {
                MFTYPE: state.MFTYPE,
                pageSize: pageSizes[state.sortBy]
            }
            fetchFundManagerList(param).then((result) => {
                state.count = result.Datas?.length
                getBaseInfo(result.Datas, param.pageSize)
            }).catch((err) => {
                console.error(err)
            });
        }
        const getBaseInfo = (data = [], target) => {
            const lateMonths = []
            const lateQoarterlys = []
            const lateYears = []
            data.forEach(item => {
                const { M, Q, Y, YIELDSE} = item
                lateMonths.push(Number(M))
                lateQoarterlys.push(Number(Q))
                lateYears.push(Number(Y))
            })
            getSortInfo({lateMonths, lateQoarterlys, lateYears,data, target})
        }

        const getSortInfo = ({lateMonths, lateQoarterlys, lateYears, data, target}) => {
            const sortLateMonths = [...lateMonths].sort((a,b) => b - a)
            const sortLateQoarterlys = [...lateQoarterlys].sort((a,b) => b - a)
            const sortLateYears = [...lateYears].sort((a,b) => b - a)
            const param = {lateMonths, lateQoarterlys, lateYears, sortLateMonths, sortLateQoarterlys, sortLateYears}
            param.target = target
            const targetIdx = sortByTarget(param)
            const targetManager = targetIdx.map(item => data[item])
            const promisArr = targetManager.map(item => fetchFundManagerDetail({mgrid: item.MGRID}))
            getManagerDetail(promisArr)
        }

        const getManagerDetail = (promisArr) => {
            Promise.all(promisArr).then(res => {
                const managerList = []
                res.forEach(item => {
                    if (item.Datas && (item.Datas.TOTALDAYS && item.Datas.TOTALDAYS / 5) > 365 && item.Datas.NETNAV > (10000*10000*20) && item.Datas.FMAXRETRA1 < 0.3) {
                        managerList.push(item.Datas)
                    }
                })

                state.managerList = [...managerList]
            })
        }

        const sortByTarget = ({lateMonths, lateQoarterlys, lateYears, sortLateMonths, sortLateQoarterlys, sortLateYears, target}) => {
            const mTop = []
            const qTop = []
            const yTop = []
            let idx = 0
            while(idx < target) {
                const m = sortLateMonths[idx]
                const q = sortLateQoarterlys[idx]
                const y = sortLateYears[idx]
                const mi = lateMonths.indexOf(m)
                const qi = lateQoarterlys.indexOf(q)
                const yi = lateYears.indexOf(y)
                mTop.push(mi)
                qTop.push(qi)
                yTop.push(yi)
                ++idx
            }
            return mTop.filter(item => {
                return qTop.includes(item) && yTop.includes(item)
            })
        }

        watchEffect(() => {
            getManagerList()
        })
        const handleOpenDetail = (data) => {
            location.href = `https://h5.1234567.com.cn/app/fund-manager/pages/manager/index?MGRID=${data.MGRID}`
        }
        return {
            state,
            option1,
            option2,
            handleOpenDetail
        }
    }
}
</script>
<style lang="less">
.fund-manager-view{
    height: 100%;
    .manager-list{
        padding-top: 0.08rem;
        height: calc(100% - 48px);
        overflow-y: auto;
    }
}
</style>