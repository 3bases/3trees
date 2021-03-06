import React, { useEffect, useState } from 'react'
import Giscus from '@giscus/react'

import { host } from '~/lib/config'
import siteConfig from '~/site-config'
import type { PageProps } from 'lib/types'

export const GiscusFoot: React.FC<PageProps & { darkMode: boolean }> = ({ pageId, darkMode }) => {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    if (darkMode) setDark(true)
    else setDark(false)
  }, [darkMode])
  return (
    <Giscus
      repo={siteConfig.giscusRepo as `${string}/${string}`}
      repoId="R_kgDOGyIBkw"
      category="General"
      categoryId="DIC_kwDOGyIBk84CBGGS"
      mapping="specific"
      term={pageId}
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={dark ? `${host}/style/giscus-dark.css` : `${host}/style/giscus-light.css`}
      lang="en"
      loading="eager"
    />
  )
}
