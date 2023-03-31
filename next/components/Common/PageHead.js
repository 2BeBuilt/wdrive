import Head from 'next/head'

export default function PageHead({ title }) {
  return (
    <Head>
      <title>{title}</title>
      <meta
        property="og:title"
        content="Your journey to the outer space of Web3!"
        key="title"
      />
    </Head>
  )
}
