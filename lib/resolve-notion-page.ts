import { parsePageId } from 'notion-utils'
import { ExtendedRecordMap } from 'notion-types'

import * as acl from './acl'
import * as types from './types'
import { pageUrlOverrides, pageUrlAdditions } from './config'
import { getPage } from './notion'
import { getSiteMaps } from './get-site-maps'
import { getSiteForDomain } from './get-site-for-domain'

const root = 'wiki'

export async function resolveNotionPage(domain: string, rawPageId?: string) {
  let site: types.Site
  let pageId: string
  let recordMap: ExtendedRecordMap

  if (rawPageId && rawPageId !== root) {
    pageId = parsePageId(rawPageId)
    if (!pageId) {
      const override = pageUrlOverrides[rawPageId] || pageUrlAdditions[rawPageId]
      if (override) pageId = parsePageId(override)
    }
    if (pageId) {
      const resources = await Promise.all([getSiteForDomain(domain), getPage(pageId)])
      site = resources[0]
      recordMap = resources[1]
    } else {
      const siteMaps = await getSiteMaps()
      const siteMap = siteMaps[0]
      pageId = siteMap?.canonicalPageMap[rawPageId]
      if (pageId) {
        site = await getSiteForDomain(domain)
        recordMap = siteMap.pageMap[pageId]
      } else return { error: { message: `Not found "${rawPageId}"`, statusCode: 404 } }
    }
  } else {
    site = await getSiteForDomain(domain)
    pageId = site.rootNotionPageId
    console.log(site)
    recordMap = await getPage(pageId)
  }

  const props = { site, recordMap, pageId }
  return { ...props, ...(await acl.pageAcl(props)) }
}
