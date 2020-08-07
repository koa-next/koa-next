import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { document as logger } from '../utils/logger';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    try {
      const initialProps = await Document.getInitialProps(ctx);
      return { ...initialProps };
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  renderStyle() {
    return {
      __html: `
        *, *::before, *::after {
          transition: none!important;
        }
      `,
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <style
            id="holderStyle"
            dangerouslySetInnerHTML={this.renderStyle()}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
