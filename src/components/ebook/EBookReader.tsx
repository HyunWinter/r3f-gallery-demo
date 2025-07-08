import Link from 'next/link'
import { useState } from 'react'
import { ReactReader } from 'react-reader'

import IconArrowTopRight from '~/components/assets/IconArrowTopRight'
import IconDownload from '~/components/assets/IconDownload'

export default function EBookReaderSection({
  title,
  summary,
  link,
  path,
}: {
  title: string
  summary: string
  link: string
  path: string
}) {
  const [location, setLocation] = useState<string | number>(0)

  function download() {
    const link = document.createElement('a')
    link.href = path
    link.click()
    link.remove()
  }

  return (
    <div>
      <section
        className="section-container pb-[2.5rem] pb-sectionPadMobile tablet:pb-sectionPad
      flex flex-col gap-4"
      >
        <h3 className="text-4xl font-NotoSans font-semibold">{title}</h3>
        <p className="text-xl text-gray-500 break-keep">{summary}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {link && (
            <Link
              href={link}
              rel="noopener noreferrer"
              target="_blank"
              className="bg-ioz-background w-fit pl-7 pr-6 py-2 rounded-full
                flex gap-x-0.5 hover:bg-[#e3e3e3] transition-colors duration-300"
            >
              <p>노래 듣기</p>
              <IconArrowTopRight />
            </Link>
          )}
          <button
            onClick={download}
            className="bg-ioz-background w-fit pl-7 pr-6 py-2 rounded-full
              flex gap-x-1 hover:bg-[#e3e3e3] transition-colors duration-300"
          >
            <p>eBook</p>
            <IconDownload />
          </button>
        </div>
      </section>
      <section className="section-container desktop:px-[5rem] px-6">
        <div className="relative h-svh border border-yellow-700/30">
          <div className="absolute inset-0 bg-yellow-50 z-[10] pointer-events-none bg-[url('/ebook/selling-story/texture.jpg')] opacity-20"></div>
          <ReactReader
            url={path}
            location={location}
            locationChanged={(epubcfi: string) => setLocation(epubcfi)}
            epubInitOptions={{
              openAs: 'epub',
            }}
            getRendition={(rendition: any) => {
              rendition.themes.default({
                'body': {
                  '-webkit-touch-callout': 'none', /* iOS Safari */
                  '-webkit-user-select': 'none', /* Safari */
                  '-khtml-user-select': 'none', /* Konqueror HTML */
                  '-moz-user-select': 'none', /* Firefox */
                  '-ms-user-select': 'none', /* Internet Explorer/Edge */
                  'user-select': 'none'
                }
              });
            }}
          />
        </div>
      </section>
    </div>
  )
}
