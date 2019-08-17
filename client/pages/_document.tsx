import Document, { Head, Main, NextScript } from 'next/document';
import logger from '../utils/logger';

class MyDocument extends Document<any> {
  static async getInitialProps(ctx) {
    try {
      const initialProps = await Document.getInitialProps(ctx);
      return { ...initialProps };
    } catch (err) {
      logger.error(err);
    }
  }

  render() {
    return (
      <html>
        <Head>
          <style>{`body { margin: 0 } /* custom! */`}</style>
          <style
            id="holderStyle"
            dangerouslySetInnerHTML={{
              __html: `
            *, *::before, *::after {
              transition: none!important;
            }
            `
            }}
          />
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
