import Document from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
<<<<<<< Updated upstream
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
=======
            sheet.collectStyles(<App {...props} />), //ServerStyleSheet를 사용해 정의된 모든 스타일을 수집하여 페이지가 렌더링되기 전에 props로 채워지도록 반환한다.
        });
      const initialProps = await Document.getInitialProps(ctx);

>>>>>>> Stashed changes
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
<<<<<<< Updated upstream
}
=======
}
>>>>>>> Stashed changes
