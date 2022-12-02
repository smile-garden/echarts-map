<template>
  <div class="wrap">
    <div class="wrap-chart"></div>
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
      layoutSize: "120%",
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
