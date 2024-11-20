<template>
  <div class="statistics-homework-container">
    <el-table :data="homeworkList" style="width: 90%; margin-top: 20px">
      <el-table-column
        label="作业编号"
        prop="homeworkNum"
        width="300"
      ></el-table-column>
      <el-table-column
        label="作业标题"
        prop="content"
        width="300"
      ></el-table-column>
      <el-table-column
        label="提交人数"
        prop="totalSubmit"
        width="300"
      ></el-table-column>
      <el-table-column label="查看统计">
        <template #default="{ row }">
          <el-button type="primary" @click="handleStatistics(row)"
            >查看统计</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="total-chart-container">
      <div
        class="chart-conainer pip-chart-container"
        style="height: 400px; width: 1000px"
      >
        <v-chart
          autoresize
          :option="allScoreLineChartOption"
          style="height: 400px; width: 1100px"
        ></v-chart>
      </div>
    </div>
  </div>
  <el-dialog
    class="statistics-homework-content-dialog"
    v-model="statisticsHomeworkDialogVisible"
    width="90vw"
    height="85vh"
    title="作业成绩统计"
  >
    <div class="statistics-dialog-container" style="width: 85vw">
      <div class="chart-conainer pip-chart-container" style="width: 70vh">
        <v-chart
          autoresize
          :option="chartOptions"
          style="height: 400px; width: 700px"
        ></v-chart>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";

const statisticsHomeworkDialogVisible = ref(false);
const homeworkList = ref([
  {
    homeworkNum: "1",
    content: "作业内容",
    totalSubmit: 10,
  },
  {
    homeworkNum: "2",
    content: "作业内容",
    totalSubmit: 10,
  },
  {
    homeworkNum: "3",
    content: "作业内容",
    totalSubmit: 8,
  },
]);

const chartOptions = ref({
  title: {
    text: "分数比例分布",
    subtext: "xxx",
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: "50%",
      data: [
        { value: 1048, name: "90 < score <= 100" },
        { value: 735, name: "80 < score <= 90" },
        { value: 580, name: "70 < score <= 80" },
        { value: 484, name: "60 < score <= 70" },
        { value: 300, name: "score <= 60" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});
const allScoreLineChartOption = {
  title: {
    text: "作业平均成绩变化折线图",
    subtext: "数据展示",
    left: "center",
  },
  tooltip: {
    trigger: "axis", // 提示框触发方式：轴触发
    axisPointer: {
      type: "line", // 轴指示器类型：直线
    },
  },
  legend: {
    data: ["平均成绩"], // 图例名称
    top: "10%", // 图例位置
  },
  xAxis: {
    type: "category", // 横轴类型：类目轴
    boundaryGap: false, // 坐标轴刻度从头开始（折线图推荐设置为 false）
    data: ["1月", "2月", "3月", "4月", "5月", "6月"], // 横轴数据
  },
  yAxis: {
    type: "value", // 纵轴类型：数值轴
    axisLabel: {
      formatter: "{value}", // 显示格式，例如单位可以加 "°C" 或 "万元"
    },
  },
  series: [
    {
      name: "销量", // 系列名称
      type: "line", // 图表类型：折线图
      data: [120, 132, 101, 134, 90, 230], // 数据
      smooth: true, // 平滑曲线
    },
  ],
};

function handleStatistics(row) {
  statisticsHomeworkDialogVisible.value = true;
}
</script>

<style lang="scss" scoped>
.statistics-homework-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px 10px;
  gap: 30px;
}
// .statistics-homework-content-dialog-content {
//   width: 1000px;
//   height: 600px;
// }
.statistics-homework-content-dialog {
  height: 75vh;
}
.statistics-dialog-container {
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}
</style>

<style lang="scss">
.el-dialog__body {
  height: 70vh;
}
</style>
