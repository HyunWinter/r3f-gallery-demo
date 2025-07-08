import dynamic from 'next/dynamic'
import * as NextHead from 'next/head'
import React, { useEffect } from 'react'

export default function Head({ title, description, noindex = false }) {
  // useEffect(() => {
  //   printInfo()
  // }, [])

  return (
    <NextHead>
      <title>{`Hyun Chung: ${title}`}</title>
      <meta name="description" content={description} />
      <meta charSet="UTF-8"></meta>
      <link
        rel="icon"
        href="/logos/logo-white.svg"
        type="image/svg+xml"
        sizes="any"
      />
      <link
        rel="apple-touch-icon"
        href="/logos/logo-white.svg"
        type="image/svg"
        sizes="any"
      />

      {noindex && <meta name="robots" content="noindex" />}
    </NextHead>
  )
}
