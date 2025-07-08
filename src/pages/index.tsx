'use client'

// Imports
import React, { useState } from "react"
import Head from '~/components/head/Head'
import useWindowSize from '~/hooks/useWindowSize'
import { MinimapSection, Navigation } from '~/components/home/Minimap'

import IconSocialYoutube from "~/components/assets/IconSocialYoutube"
import IconSocialTwitter from "~/components/assets/IconSocialTwitter"
import IconSocialSoundCloud from "~/components/assets/IconSocialSoundCloud"
import IconSocialInstagram from "~/components/assets/IconSocialInstagram"

const images = [
  // Front
  { position: [0, -0.4, 3], rotation: [0, 0, 0], url: '/1.jpg', title: "Weathered old man", date: '2025.07.08', link: 'https://www.hyun-wt.com/' },
  // Left
  { position: [-2.25, -0.4, 3.75], rotation: [0, Math.PI / 5, 0], url: '/2.jpg', title: "Secure man", date: '2025.05.06', link: 'https://www.hyun-wt.com/' },
  { position: [-1.75, -0.4, 2], rotation: [0, Math.PI / 7.5, 0], url: '/3.jpg', title: "Sister", date: '2025.03.28', link: 'https://www.hyun-wt.com/' },
  // Right
  { position: [2.25, -0.4, 3.75], rotation: [0, -Math.PI / 5, 0], url: '/4.jpg', title: "Man with a mustache", date: '2025.01.14', link: 'https://www.hyun-wt.com/' },
  { position: [1.75, -0.4, 2], rotation: [0, -Math.PI / 7.5, 0], url: '/5.jpg', title: "Door", date: '2024.11.05', link: 'https://www.hyun-wt.com/' },
]

function Overlay({ isMobile }) {
  const currentDate = new Date()
  const year = currentDate.getFullYear()

  return (
    <>
      <div className={`absolute ${isMobile ? "top-[20px] left-[20px]" : "top-[40px] left-[40px]"} text-[13px] text-gray-400 pointer-events-none select-none`}>
        Images Replaced
        <br />
        For Demo
      </div>
      <div className={`absolute ${isMobile ? "bottom-[20px] left-1/2 -translate-x-1/2" : "bottom-[40px] left-[40px] translate-x-0"} text-center md:text-left text-[13px] flex flex-col text-gray-400 select-none`}>
        <span>Developed by <a href="https://www.hyun-wt.com/" target="_blank" rel="noopener noreferrer" className="text-[#9ca3af] hover:text-[#bcc2cc] transition-colors duration-300">Hyun Chung</a>.</span>
        <span className="pointer-events-none whitespace-nowrap">© {year} Hyun Chung, All rights reserved.</span>
      </div>
      <div className={`absolute ${isMobile ? "bottom-[20px] right-[20px]" : "bottom-[40px] right-[40px]"} text-[13px] hidden md:flex select-none gap-x-2`}>
        <a href="https://www.hyun-wt.com/" target="_blank" rel="noopener noreferrer">
          <IconSocialYoutube className="w-6 h-6 text-[#9ca3af] hover:text-[#bcc2cc] transition-colors duration-300" />
        </a>
        <a href="https://www.hyun-wt.com/" target="_blank" rel="noopener noreferrer">
          <IconSocialTwitter className="w-6 h-6 text-[#9ca3af] hover:text-[#bcc2cc] transition-colors duration-300" />
        </a>
        <a href="https://www.hyun-wt.com/" target="_blank" rel="noopener noreferrer">
          <IconSocialInstagram className="w-6 h-6 text-[#9ca3af] hover:text-[#bcc2cc] transition-colors duration-300" />
        </a>
        <a href="https://www.hyun-wt.com/" target="_blank" rel="noopener noreferrer">
          <IconSocialSoundCloud className="w-6 h-6 text-[#9ca3af] hover:text-[#bcc2cc] transition-colors duration-300" />
        </a>
      </div>
    </>
  )
}

export default function IndexPage() {
  const [activeFrame, setActiveFrame] = useState<string | undefined>()
  const [wasActiveFrame, setWasActiveFrame] = useState<string | undefined>()
  const { width } = useWindowSize()
  const isMobile = width < 768

  return (
    <>
      <Head
        title="Homepage"
        description="Gallery Demo"
      />
      <MinimapSection images={images} activeFrame={activeFrame} setActiveFrame={setActiveFrame} wasActiveFrame={wasActiveFrame} setWasActiveFrame={setWasActiveFrame} isMobile={isMobile} />
      <Navigation images={images} activeFrame={activeFrame} setActiveFrame={setActiveFrame} setWasActiveFrame={setWasActiveFrame} isMobile={isMobile} />
      <Overlay isMobile={isMobile} />
    </>
  )
}
