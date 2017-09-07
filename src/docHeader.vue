<template>
    <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="活动区域">
            <el-select v-model="docNoList" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        name: 'docHeader',
        data() {
            return {
                docNoList: []
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>