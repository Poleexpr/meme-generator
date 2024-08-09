import html2canvas from 'html2canvas'

import { downloadImage } from './downloadImage'

export const exportAsImage = async (element: HTMLDivElement, imageFileName: string) => {
  const canvas = await html2canvas(element, { allowTaint: true, logging: true, useCORS: true })
  const image = canvas.toDataURL('image/png', 1.0)
  downloadImage(image, imageFileName)
}
