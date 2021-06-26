import fs from 'fs';
import path from 'path';
import { IControllerCtx } from '../interface';

export default {
  async getIndexHtml(ctx: IControllerCtx) {
    ctx.setState({ name: 'Jack' });
    ctx.setState({ age: 18 });
    ctx.setState({
      price(price: number) {
        return price / 100;
      },
    });

    return ctx.render('index/index');
  },
  async getDownloadFile(ctx: IControllerCtx) {
    ctx.response.attachment('text.text');
    const fileReader = fs.createReadStream(
      path.resolve(__dirname, '../../../public/test.txt')
    );
    ctx.response.body = fileReader;
  },
};
