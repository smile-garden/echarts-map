<template>
  <div class="wrap">
    <div class="wrap-chart">
      <div class="total-card">
        <div class="total-card__item">
          <div>较上日+ {{ store.chinaAdd.localConfirmH5 }}</div>
          <div class="num">{{ store.chinaTotal.localConfirm }}</div>
          <div>本土现有确诊</div>
        </div>
        <div class="total-card__item">
          <div>较上日+ {{ store.chinaAdd.nowConfirm }}</div>
          <div class="num">{{ store.chinaTotal.nowConfirm }}</div>
          <div>现有确诊</div>
        </div>
        <div class="total-card__item">
          <div>较上日+ {{ store.chinaAdd.confirm }}</div>
          <div class="num">{{ store.chinaTotal.confirm }}</div>
          <div>累计确诊</div>
        </div>
        <div class="total-card__item">
          <div>较上日+ {{ store.chinaAdd.noInfect }}</div>
          <div class="num">{{ store.chinaTotal.noInfect }}</div>
          <div>无症状感染者</div>
        </div>
        <div class="total-card__item">
          <div>较上日+ {{ store.chinaAdd.importedCase }}</div>
          <div class="num">{{ store.chinaTotal.importedCase }}</div>
          <div>境外输入</div>
        </div>
        <div class="total-card__item">
          <div>较上日+ {{ store.chinaAdd.dead }}</div>
          <div class="num">{{ store.chinaTotal.dead }}</div>
          <div>累计死亡</div>
        </div>
      </div>

      <div class="total-pie"></div>

      <div class="total-line"></div>
    </div>
    <div id="china" class="wrap-map"></div>
    <div class="wrap-table">
      <table class="table" cellspacing="0" border="1">
        <thead>
          <tr>
            <th>地区</th>
            <th>新增确诊</th>
            <th>累计确诊</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <transition-group enter-active-class="animate__animated animate__flipInY" tag="tbody">
          <tr v-for="(item, index) in store.item" :key="`${item.name}-${index}`">
            <td>{{ item.name }}</td>
            <td>{{ item.today.confirm }}</td>
            <td>{{ item.total.confirm }}</td>
            <td>{{ item.total.heal }}</td>
            <td>{{ item.total.dead }}</td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from './store';
import * as echarts from 'echarts';
import './assets/china';
import { geoCoordMap } from './assets/geoMap';
import 'animate.css'

const store = useStore();

onMounted(async () => {
  await store.getList();
  initCharts();
  initPie();
  initLine();
});

const initCharts = () => {
  const provinces = store.list.diseaseh5Shelf.areaTree[0].children;
  store.item = provinces[2].children;
  const data = provinces.map(v => ({
    name: v.name,
    value: geoCoordMap[v.name].concat(v.total.confirm),
    children: v.children,
  }));
  const charts = echarts.init(document.querySelector('#china') as HTMLElement);
  /* const data = [
    {
      name: "内蒙古",
      itemStyle: {
        areaColor: 'red',
      },
      value: [110.3467, 41.4899]
    },
  ]; */
  charts.setOption({
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      itemStyle: {
        /* normal: {
          areaColor: {
            type: "linear-gradient",
            x: 0,
            y: 1200,
            x2: 1000,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "#152E6E", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#0673AD", // 50% 处的颜色
              },
            ],
            global: true, // 缺省为 false
          },
          shadowColor: "#0f5d9d",
          shadowOffsetX: 0,
          shadowOffsetY: 15,
          opacity: 0.5,
        }, */
      },
      emphasis: {
        areaColor: "#0f5d9d",
      },

      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            /* normal: {
              opacity: 0,
              label: {
                show: false,
                color: "#009cc9",
              },
            }, */
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        // selectedMode: "multiple",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "120%",
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 2,
        },
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
        itemStyle: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true,
            color: "#fff",
          },
        },
        data,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        // symbolOffset:[0, '-40%'] ,
        symbol: 'pin',
        symbolSize: [45, 45],
        label: {
          show: true,
          color: '#fff',
          formatter(value: any) {
            return value.data.value[2];
          }
        },
        itemStyle: {
          /* normal: {
            color: '#D8BC37', //标志颜色
          } */
        },
        data,
      },
    ],
  });

  charts.on('click', (e: any) => {
    store.item = e.data.children;
  })
}

const initPie = () => {
  const charts = echarts.init(document.querySelector('.total-pie') as HTMLElement)
  charts.setOption({
    backgroundColor: "#223651",
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '15',
          }
        },
        data: store.cityDetail.map(v => {
          return {
            name: v.city,
            value: v.nowConfirm
          }
        })
      }
    ]
  })
}

const initLine = () => {
  const charts = echarts.init(document.querySelector('.total-line') as HTMLElement)
  charts.setOption({
    backgroundColor: "#223651",
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: store.cityDetail.map(v => v.city),
      axisLine: {
        lineStyle: {
          color: "#fff"
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: "#fff"
        }
      }
    },
    label: {
      show: true
    },
    series: [
      {
        data: store.cityDetail.map(v => v.nowConfirm),
        type: 'line',
        smooth: true
      }
    ]
  })
}
</script>

<style lang="less" scoped>
.wrap {
  display: flex;
  padding: 10px;
  height: 100%;
  background-color: rgba(#000, 0.8);
  overflow: hidden;

  &-chart {
    width: 400px;

    .total {
      &-card {
        display: grid;
        grid-template-columns: auto auto auto;
        grid-template-rows: auto auto;
        background-color: #073354;
        text-align: center;
        color: #fff;

        &__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px;
          border: 1px solid #000;
          
          .num {
            padding: 10px 0;
            font-size: 20px;
            font-weight: bold;
            color: #41b0db;
          }
        }
      }

      &-pie, &-line {
        margin-top: 16px;
        height: 320px;
      }
    }
  }

  &-map {
    flex: 1;
  }

  &-table {
    width: 400px;
    color: #fff;

    .table {
      text-align: center;
      background-color: #073354;

      tr {
        th {
          padding: 5px;
          white-space: nowrap;
        }

        td {
          padding: 5px 10px;
          width: 100px;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
