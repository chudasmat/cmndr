import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="cmndr" key="title"/>
        <meta property="og:description" content="Your best friend for Economics" key="description"/>
        <meta
          property="og:image"
          content="https://ibb.co/mCdts22"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
