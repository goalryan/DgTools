<template>
    <el-table
            :data="products" border :show-summary="false" :stripe="true" style="width: 100%">
        <el-table-column label="序号" type="index" width="50">
        </el-table-column>
        <el-table-column label="商品名称">
            <template scope="scope">
                <el-input v-model="scope.row.name" size="small" placeholder="请输入商品名称"></el-input>
            </template>
        </el-table-column>
        <el-table-column label="数量">
            <template scope="scope">
                <el-input v-model="scope.row.quantity" size="small" placeholder="请输入数量"
                          @change="changeQuantity(scope.$index)"></el-input>
            </template>
        </el-table-column>
        <el-table-column label="成本价(港币)">
            <template scope="scope">
                <el-input v-model="scope.row.inUnitPrice" size="small" placeholder="请输入成本价"
                          @change="changeInUnitPrice(scope.$index)"></el-input>
            </template>
        </el-table-column>
        <el-table-column prop="outUnitPrice" label="卖出价(人民币)">
            <template scope="scope">
                <el-input v-model="scope.row.outUnitPrice" size="small" placeholder="请输入成本价"
                          @change="changeOutUnitPrice(scope.$index)"></el-input>
            </template>
        </el-table-column>
        <el-table-column prop="inTotalPrice" label="总成本(港币)">
        </el-table-column>
        <el-table-column prop="outTotalPrice" label="总收入(人民币)">
        </el-table-column>
        <el-table-column prop="profit" sortable label="利润">
        </el-table-column>
        <el-table-column label="操作" width="160">
            <template scope="scope">
                <el-button size="small" type="text" @click="addProduct(scope.$index)">添加商品</el-button>
                <el-button size="small" type="text" @click="delProduct(scope.$index, scope.row)">删除商品</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: 'childList',
        props: {
            products: {
                type: Array,
                default: []
            },
            taxRate: {
                type: String,
                default: '1'
            }
        },
        data() {
            return {};
        },
        computed: {},
        methods: {
            getSummaries(param) {
                const {columns, data} = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '总价';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        sums[index] += ' 元';
                    } else {
                        sums[index] = 'N/A';
                    }
                });

                return sums;
            },
            addProduct(index){
                const product = {
                    name: '',
                    quantity: 1,
                    inUnitPrice: '',
                    outUnitPrice: '',
                    inTotalPrice: '',
                    outTotalPrice: '',
                    profit: '',
                }
                this.products.splice(index + 1, 0, product);
            },
            delProduct(index){
                if (this.products.length == 1) {
                    // this.$message({message: '恭喜你，这是一条成功消息', type: 'success'});
                    this.$message({message: '必须保留一个商品', type: 'warning'});
                    // this.$message({message: '恭喜你，这是一条成功消息', type: 'error'});
                    // this.$message({message: '恭喜你，这是一条成功消息'});
                } else {
                    this.products.splice(index, 1);
                    this.$emit('updateCustomer');
                }
            },
            changeQuantity(index){
                this.calculateOutTotalPrice(index);
                this.calculateInTotalPrice(index);
                this.calculateProfit(index);
                this.$emit('updateCustomer');
            },
            changeInUnitPrice(index){
                this.calculateInTotalPrice(index);
                this.calculateProfit(index);
                this.$emit('updateCustomer');
            },
            changeOutUnitPrice(index){
                this.calculateOutTotalPrice(index);
                this.calculateProfit(index);
                this.$emit('updateCustomer');
            },
            calculateInTotalPrice(index){
                const item = this.products[index];
                item.inTotalPrice = (item.inUnitPrice * item.quantity).toFixed(0);
            },
            calculateOutTotalPrice(index){
                const item = this.products[index];
                item.outTotalPrice = (item.outUnitPrice * item.quantity).toFixed(0);
            },
            calculateProfit(index){
                const item = this.products[index];
                item.profit = (item.outTotalPrice - item.inTotalPrice * this.taxRate).toFixed(0);
            }
        }
    };
</script>