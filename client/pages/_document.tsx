import Document, { Head, Main, NextScript } from 'next/document';

class MyDocument extends Document<any> {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const csrf = ctx.req.headers['csrf'];
    return { ...initialProps, csrf };
  }

  renderCSRF(csrf) {
    return {
      __html: `window.csrf="${csrf}"`,
    };
  }

  render() {
    const { csrf } = this.props;
    return (
      <html>
        <Head>
          <style>{`body { margin: 0 } /* custom! */`}</style>
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
          <script dangerouslySetInnerHTML={this.renderCSRF(csrf)} />
        </body>
      </html>
    );
  }
}

export default MyDocument;
