import axios from 'axios';

const server = axios.create({
  baseURL: 'https://api.inews.qq.com',
});

export const getList = () => server.get('/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf').then(res => res.data.data);
