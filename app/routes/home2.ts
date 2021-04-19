import HomeController from '../controller/home2';

export default [
  {
    path: '/',
    method: 'get',
    controller: HomeController.getIndexHtml,
  }
];
