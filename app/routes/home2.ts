import HomeController from '../controller/home2';

export default [
  {
    path: '/home2',
    method: 'get',
    controller: HomeController.getIndexHtml,
  },
];
