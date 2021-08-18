import favicons from 'favicons'
import fs from 'fs'
import path from 'path'

import siteConfig from '../site-config.js'

export default async () =>
  new Promise((resolve, reject) =>
    favicons(
      path.resolve(process.cwd(), 'src', 'public', 'favicon.svg'),
      {
        path: '/',
        appName: siteConfig.title,
        appShortName: siteConfig.title,
        appDescription: siteConfig.description,
        developerName: siteConfig.title,
        developerURL: siteConfig.url,
        background: siteConfig.bgColor,
        theme_color: siteConfig.themeColor,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: false,
          windows: true,
          yandex: false,
        },
        logging: true,
      },
      async (error, { files, images }) => {
        if (error) return reject(error)
        await Promise.all(
          [...images, ...files].map(({ name, contents }) =>
            fs.writeFile(path.resolve(process.cwd(), 'public', name), contents, reject)
          )
        )
        return resolve(null)
      }
    )
  )
