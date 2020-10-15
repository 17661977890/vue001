<template>
  <div class="app-container">
    <div class="total-layout">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="total-frame" shadow="hover">
            <div class="svg_icon">
              <svg-icon icon-class="order" class="total-icon"></svg-icon>
            </div>
            <div class="total-title">今日订单数量</div>
            <div class="total-value">{{orderData.nowOrderCount}}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="total-frame" shadow="hover">
            <div class="svg_icon">
              <svg-icon icon-class="total-today" class="total-icon">
              </svg-icon>
            </div>
            <div class="total-title">今日销售总额</div>
            <div class="total-value"><svg-icon icon-class="money" class="small-icon"></svg-icon>{{orderData.nowOrderPay}}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="total-frame" shadow="hover">
            <div class="svg_icon">
              <svg-icon icon-class="total-yesterday" class="total-icon">
              </svg-icon>
            </div>
            <div class="total-title">昨日销售总额</div>
            <div class="total-value"><svg-icon icon-class="money" class="small-icon"/>{{orderData.yesOrderPay}}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="total-frame" shadow="hover">
            <div class="svg_icon">
              <svg-icon icon-class="total-week" class="total-icon">
              </svg-icon>
            </div>
            <div class="total-title">近7天销售总额</div>
            <div class="total-value"><svg-icon icon-class="money" class="small-icon"/>{{orderData.qiOrderPay}}</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
   <!-- <div class="total-layout">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item,i) in redList" :key="i">
          <div class="total-frame">
            <svg-icon icon-class="order" class="total-icon"></svg-icon>
            <div class="total-title"></div>
            <div class="total-value">
              <el-button
                size="mini"
                type="danger"
                @click="handleRed(item.id)">领取红包
              </el-button>
            </div>
            <div class="total-title">{{item.note}}</div>
          </div>
        </el-col>

      </el-row>
    </div> -->
    <div class="overview-layout">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="out-border">
            <div class="layout-title">商品总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">{{goods.offCount}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{goods.onCount}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{goods.nowCount}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{goods.allCount}}</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">已下架</el-col>
                <el-col :span="6" class="overview-item-title">已上架</el-col>
                <el-col :span="6" class="overview-item-title">今日新增</el-col>
                <el-col :span="6" class="overview-item-title">全部商品</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="out-border">
            <div class="layout-title">会员总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">{{member.nowCount}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{member.yesUserCount}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{member.qiUserCount}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{member.allCount}}</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">今日新增</el-col>
                <el-col :span="6" class="overview-item-title">昨日新增</el-col>
                <el-col :span="6" class="overview-item-title">本月新增</el-col>
                <el-col :span="6" class="overview-item-title">会员总数</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="out-border">
            <div class="layout-title">商家总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">{{user.nowCount}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{user.yesUserCount}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{user.qiUserCount}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{user.allCount}}</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">今日新增</el-col>
                <el-col :span="6" class="overview-item-title">昨日新增</el-col>
                <el-col :span="6" class="overview-item-title">本月新增</el-col>
                <el-col :span="6" class="overview-item-title">商家总数</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="un-handle-layout">
      <!-- <div class="layout-title">待处理事务</div>
      <div class="un-handle-content">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待付款订单</span>
              <span style="float: right" class="color-danger">({{orderStatusCount.status0}})</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已完成订单</span>
              <span style="float: right" class="color-danger">({{orderStatusCount.status3}})</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已发货订单</span>
              <span style="float: right" class="color-danger">({{orderStatusCount.status2}})</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待发货订单</span>
              <span style="float: right" class="color-danger">({{orderStatusCount.status1}})</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已关闭订单</span>
              <span style="float: right" class="color-danger">({{orderStatusCount.status4}})</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待处理退款申请</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已发货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待处理退货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">广告位即将到期</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
        </el-row>
      </div> -->
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="layout-title">商品销量排行</div>
          <div>
            <ve-pie :data="pieChartData" :settings="pieChartSettings"></ve-pie>
          </div>
        </el-col>

        <el-col :span="18">
          <div class="layout-title">近一年订单明细</div>
          <div>
            <ve-line :data="orderDetailChartData" :settings="orderDetailChartSettings"></ve-line>
          </div>
        </el-col>
      </el-row>
    </div>
    
    <div class="statistics-layout">
      <div class="layout-title">交易走势</div>
      <el-row>
        <el-col :span="4">
          <div style="padding: 20px">
            <div>
              <div style="color: #909399;font-size: 14px">本月成交订单总数</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">{{orderStaticData.monthOrderCount}}</div>
              <div>
                <span class="color-success" style="font-size: 14px">+10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本周成交订单总数</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">{{orderStaticData.weekOrderCount}}</div>
              <div>
                <span class="color-danger" style="font-size: 14px">-10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本月销售总额</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">{{orderStaticData.monthSaleCount}}</div>
              <div>
                <span class="color-success" style="font-size: 14px">+10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本周销售总额</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">{{orderStaticData.weekSaleCount}}</div>
              <div>
                <span class="color-danger" style="font-size: 14px">-10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div style="padding: 10px;border-left:1px solid #DCDFE6">
            <el-date-picker
              style="float: right;z-index: 1"
              size="small"
              v-model="orderCountDate"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="handleDateChange"
              :picker-options="pickerOptions">
            </el-date-picker>
            <div>
              <!-- 属性显示折线图标识项:legend-visible="false"-->
              <ve-line
                :data="chartData"
                :loading="loading"
                :data-empty="dataEmpty"
                :settings="chartSettings"></ve-line>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {str2Date} from '@/utils/date';
  // import {orderStatic,goodsStatic,userStatic,acceptRedPacket,list} from '@/api/home'
  const DATA_FROM_BACKEND = {
    columns: ['date', 'orderCount','orderAmount'],
    rows: [
      {date: '2018-11-01', orderCount: 10, orderAmount: 1093},
      {date: '2018-11-02', orderCount: 20, orderAmount: 2230},
      {date: '2018-11-03', orderCount: 33, orderAmount: 3623},
      {date: '2018-11-04', orderCount: 50, orderAmount: 6423},
      {date: '2018-11-05', orderCount: 80, orderAmount: 8492},
      {date: '2018-11-06', orderCount: 60, orderAmount: 6293},
      {date: '2018-11-07', orderCount: 20, orderAmount: 2293},
      {date: '2018-11-08', orderCount: 60, orderAmount: 6293},
      {date: '2018-11-09', orderCount: 50, orderAmount: 5293},
      {date: '2018-11-10', orderCount: 30, orderAmount: 3293},
      {date: '2018-11-11', orderCount: 20, orderAmount: 2293},
      {date: '2018-11-12', orderCount: 80, orderAmount: 8293},
      {date: '2018-11-13', orderCount: 100, orderAmount: 10293},
      {date: '2018-11-14', orderCount: 10, orderAmount: 1293},
      {date: '2018-11-15', orderCount: 40, orderAmount: 4293}
    ]
  };
  const GOODS_PIE_CHART_DATA = {
      columns: ['name', 'saleCount'],
      rows: [
        { 'name': '服装', 'saleCount': 1393 },
        { 'name': '烟酒', 'saleCount': 3530 },
        { 'name': '电子产品', 'saleCount': 2923 },
        { 'name': '书籍', 'saleCount': 1723 },
        { 'name': '日用百货', 'saleCount': 3792 },
        { 'name': '化妆品', 'saleCount': 4593 },
        { 'name': '运动器械', 'saleCount': 4593 }
      ]
  }
  const ORDER_DETAIL_STATIC_DATA = {
    columns: ['date', 'toBePaid','toBeShipped','toBeReceived','completed','toBeRefunded','refuned'],
    rows: [
      {date: '1月', toBePaid: 0, toBeShipped: 15, toBeReceived: 0, completed: 150, toBeRefunded: 10, refuned: 0},
      {date: '2月', toBePaid: 0, toBeShipped: 0, toBeReceived: 0, completed: 160, toBeRefunded: 10, refuned: 0},
      {date: '3月', toBePaid: 0, toBeShipped: 15, toBeReceived: 0, completed: 103, toBeRefunded: 10, refuned: 0},
      {date: '4月', toBePaid: 0, toBeShipped: 1, toBeReceived: 0, completed: 106, toBeRefunded: 10, refuned: 0},
      {date: '5月', toBePaid: 0, toBeShipped: 15, toBeReceived: 0, completed: 125, toBeRefunded: 10, refuned: 3},
      {date: '6月', toBePaid: 0, toBeShipped: 2, toBeReceived: 0, completed: 186, toBeRefunded: 10, refuned: 5},
      {date: '7月', toBePaid: 0, toBeShipped: 15, toBeReceived: 0, completed: 165, toBeRefunded: 10, refuned: 5},
      {date: '8月', toBePaid: 0, toBeShipped: 6, toBeReceived: 0, completed: 133, toBeRefunded: 10, refuned: 0},
      {date: '9月', toBePaid: 0, toBeShipped: 15, toBeReceived: 0, completed: 144, toBeRefunded: 10, refuned: 7},
      {date: '10月', toBePaid: 0, toBeShipped: 8, toBeReceived: 0, completed: 155, toBeRefunded: 10, refuned: 9},
      {date: '11月', toBePaid: 0, toBeShipped: 0, toBeReceived: 12, completed: 166, toBeRefunded: 10, refuned: 0},
      {date: '12月', toBePaid: 0, toBeShipped: 0, toBeReceived: 34, completed: 102, toBeRefunded: 10, refuned: 5}
    ]
  };
  export default {
    name: 'home',
    data() {
      return {
        redList:[
          {id:"1",note:"10"}
        ],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              let start = new Date();
              start.setFullYear(2018);
              start.setMonth(10);
              start.setDate(1);
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一月',
            onClick(picker) {
              const end = new Date();
              let start = new Date();
              start.setFullYear(2018);
              start.setMonth(10);
              start.setDate(1);
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        orderData:{
          nowOrderCount:'10',
          nowOrderPay: '100',
          yesOrderPay: '120',
          qiOrderPay: '820'
        },
        orderStaticData:{
          monthOrderCount:'230',
          weekOrderCount: '56',
          monthSaleCount: '850',
          weekSaleCount: '260'
        },
        goods:{
          offCount:'1',
          onCount:'15',
          nowCount:'2',
          allCount:'16'
        },
        user:{
          nowCount:'1',
          yesUserCount:'2',
          qiUserCount:'3',
          allCount:'100'
        },
        member:{
          nowCount:'1',
          yesUserCount:'2',
          qiUserCount:'10',
          allCount:'15'
        },
        orderStatusCount:'',
        orderCountDate: '',
        chartSettings: {
          xAxisType: 'time',
          area:true,
          axisSite: { right: ['orderAmount']},
        labelMap: {'orderCount': '成交数量', 'orderAmount': '成交金额'}},
        chartData: {
          columns: [],
          rows: []
        },
        pieChartSettings: {
          limitShowNum: 5
        },
        pieChartData: {
          columns: [],
          rows: [
          ]
        },
        orderDetailChartSettings: {
          xAxisType: 'category',
          area:true,
          // axisSite: { right: ['orderAmount']},
        // 待付款、待发货、待收货、已完成、待退款、已退款
        labelMap: {'toBePaid': '待付款', 'toBeShipped': '代发货', 'toBeReceived': '待收货', 'completed': '已完成', 'toBeRefunded': '待退款', 'refuned': '已退款'}},
        orderDetailChartData: {
          columns: [],
          rows: []
        },
        loading: false,
        dataEmpty: false
      }
    },
    created(){
      this.initOrderCountDate();
      this.getData();
      this.getGoodsPieData();
      this.getOrderDetailLineData();
    },
    methods:{
      handleRed(id) {
        acceptRedPacket(id).then(response => {
          this.$message({
              message: response.data,
              type: 'success',
              duration: 1000
          });          
        });
      },
      handleDateChange(){
        this.getData();
      },
      // 初始化订单 数量和日期统计
      initOrderCountDate(){
        // orderStatic().then(res => {
        //   if(res.code == 200){
        //     this.orderData = res.data;
        //     this.orderStatusCount = res.data.orderStatusCount;
        //   }
        // });
        // goodsStatic().then(res => {
        //   if(res.code == 200){
        //     this.goods = res.data;
        //   }
        // });
        // userStatic().then(res => {
        //   if(res.code == 200){
        //     this.user = res.data;
        //   }
        // });
        // list().then(res => {
        //   if(res.code == 200){
        //     this.redList = res.data.list;
        //   }
        // });
        let start = new Date();
        start.setFullYear(2018);
        start.setMonth(10);
        start.setDate(1);
        const end = new Date();
        end.setTime(start.getTime() + 1000 * 60 * 60 * 24 * 7);
        this.orderCountDate=[start,end];
      },
      getData(){
        setTimeout(() => {
          this.chartData = {
            columns: ['date', 'orderCount','orderAmount'],
            rows: []
          };
          for(let i=0;i<DATA_FROM_BACKEND.rows.length;i++){
            let item=DATA_FROM_BACKEND.rows[i];
            let currDate=str2Date(item.date);
            let start=this.orderCountDate[0];
            let end=this.orderCountDate[1];
            if(currDate.getTime()>=start.getTime()&&currDate.getTime()<=end.getTime()){
              this.chartData.rows.push(item);
            }
          }
          this.dataEmpty = false;
          this.loading = false
        }, 1000)
      },
      getGoodsPieData() {
        // for(let i=0;i<GOODS_PIE_CHART_DATA.rows.length;i++){
        //   let item=GOODS_PIE_CHART_DATA.rows[i];
        //     this.chartData.rows.push(item);
        // }
        this.pieChartData = GOODS_PIE_CHART_DATA;
      },
      getOrderDetailLineData() {
        // for(let i=0;i<GOODS_PIE_CHART_DATA.rows.length;i++){
        //   let item=GOODS_PIE_CHART_DATA.rows[i];
        //     this.chartData.rows.push(item);
        // }
        this.orderDetailChartData = ORDER_DETAIL_STATIC_DATA;
      }
    }
  }
</script>

<style scoped>
  .app-container {
    background-color: #f0f2f5;
    padding: 32px;
  }

  .total-layout {
    margin: 15px 10px;
  }

  .total-frame {
    border: 1px solid #DCDFE6;
    padding: 20px;
    height: 100px;
  }
  .svg_icon {
    position: relative;
    left: -79px;
    top: 0px;
  }

  .total-icon {
    color: #409EFF;
    width: 60px !important;
    height: 60px !important;
  }

  .total-title {
    position: relative;
    font-size: 16px;
    color: #909399;
    left: 70px;
    top: -79px;
  }

  .total-value {
    position: relative;
    font-size: 18px;
    color: #606266;
    left: 62px;
    top: -56px;
  }

  .un-handle-layout {
    margin: 15px 10px;
    border: 1px solid #DCDFE6;
    background: rgb(255, 255, 255);
  }

  .layout-title {
    color: #606266;
    padding: 15px 20px;
    background: #F2F6FC;
    font-weight: bold;
  }

  .un-handle-content {
    padding: 20px 40px;
  }

  .un-handle-item {
    border-bottom: 1px solid #EBEEF5;
    padding: 10px;
  }

  .overview-layout {
     margin: 15px 10px;
  }

  .overview-item-value {
    font-size: 24px;
    text-align: center;
  }

  .overview-item-title {
    margin-top: 10px;
    text-align: center;
  }

  .out-border {
    border: 1px solid #DCDFE6;
    background: rgb(255, 255, 255);
  }


  .statistics-layout {
     margin: 15px 10px;
    border: 1px solid #DCDFE6;
    background: rgb(255, 255, 255);
  }
</style>
