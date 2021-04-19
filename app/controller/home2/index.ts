import { IControllerCtx } from '../interface';

export default {
  async getIndexHtml(ctx: IControllerCtx) {
    ctx.setState({ name: 'Jack2' });
    ctx.setState({ age: 20 });
    ctx.setState({
      price(price: number) {
        return price / 100;
      },
    });

    return ctx.render('index/index.njk');
  },
};
