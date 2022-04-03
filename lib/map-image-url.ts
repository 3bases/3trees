import { Block } from 'notion-types'
import { imageCDNHost } from './config'

// more recent versions of notion don't proxy unsplash images
const EXPCEPTION = 'https://images.unsplash.com'

export const mapNotionImageUrl = (url: string, block: Block): string  => {
  if (url.startsWith('data:')) return url
  if (imageCDNHost && url.startsWith(imageCDNHost)) return url
  if (url.startsWith('/images')) url = `https://www.notion.so${url}`

  if (!url.startsWith(EXPCEPTION)) {
    url = `https://www.notion.so${url.startsWith('/image') ? url : `/image/${encodeURIComponent(url)}`}`
    const notionImageUrlV2 = new URL(url)
    let table = block.parent_table === 'space' ? 'block' : block.parent_table
    if (table === 'collection') table = 'block'
    notionImageUrlV2.searchParams.set('table', table)
    notionImageUrlV2.searchParams.set('id', block.id)
    notionImageUrlV2.searchParams.set('cache', 'v2')
    url = notionImageUrlV2.toString()
  }
  return mapImageUrl(url)
}

export const mapImageUrl = (imageUrl: string): string  => {
  if (imageUrl.startsWith('data:')) return imageUrl
  if (imageCDNHost) return `${imageCDNHost}/${encodeURIComponent(imageUrl)}`
  else return imageUrl
}
