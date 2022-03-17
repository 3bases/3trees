import * as React from 'react'
import Head from 'next/head'
import { PageProps } from 'lib/types'

// TODO: remove duplication between PageHead and NotionPage Head

export const PageHead: React.FC<PageProps & { darkMode: boolean }> = ({ site, darkMode }) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

      {site?.description && (
        <>
          <meta name="description" content={site.description} />
          <meta property="og:description" content={site.description} />
        </>
      )}
      {darkMode ? <meta name="theme-color" content="#2f3437" /> : <meta name="theme-color" content="#fff" />}
      <meta property="og:type" content="website" />
    </Head>
  )
}
