// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import { Canvg } from 'canvg';

/* export const getPdf = (id: any) => {
  let title = '预览图'
  var pdf = new JsPDF("p", "mm", "a4") // A4纸，纵向
  console.log(document.getElementsByClassName('get'))
  //console.log(htmlDom)
  //console.log(htmlDom.item(i))
  html2Canvas(document.getElementById(id) as HTMLElement, {
    allowTaint: true,
    scrollY: 0, 
    scrollX: 0,
  }).then(function (canvas) {
    console.log(canvas.height)
    var ctx = canvas.getContext("2d")
    var a4w = 160; var a4h = 190 // A4大小，210mm x 297mm，四边各保留20mm的边距，显示区域170x257
    var imgHeight = Math.floor(a4h * canvas.width / a4w) // 按A4显示比例换算一页图像的像素高度
    var renderedHeight = 0
    while (renderedHeight < canvas.height) {
      var page = document.createElement("canvas")
      page.width = canvas.width
      page.height = Math.min(imgHeight, canvas.height - renderedHeight);// 可能内容不足一页
      // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
      (page as any).getContext("2d").putImageData((ctx as any).getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0)
      pdf.addImage(page.toDataURL("image/jpeg", 1.0), "JPEG", 10, 10, a4w, Math.min(a4h, a4w * page.height / page.width)) // 添加图像到页面，保留10mm边距
      renderedHeight += imgHeight
      if (renderedHeight < canvas.height) { pdf.addPage() }// 如果后面还有内容，添加一个空页
    }
    pdf.save(title + '.pdf')
  })
} */


export const getPdf = (id: any) => {
  let title = '预览图'
  var pdf = new JsPDF("p", "mm", "a4") // A4纸，纵向
  const getCanvas = document.getElementsByClassName('get')
  console.log(getCanvas.item(0))
  for (let i = 0; i < getCanvas.length; i++) {
    var count = 0;
    html2Canvas(getCanvas.item(i) as HTMLElement, {
      allowTaint: true,
      scrollY: 0,
      scrollX: 0,
    }).then(function (canvas) {
      var ctx = canvas.getContext("2d")
      var a4w = 160; var a4h = 190
      var imgHeight = Math.floor(a4h * canvas.width / a4w) // 按A4显示比例换算一页图像的像素高度

      var page = document.createElement("canvas")
      page.width = canvas.width
      page.height = Math.min(imgHeight, canvas.height);// 可能内容不足一页
      // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
      (page as any).getContext("2d").putImageData((ctx as any).getImageData(0, 0, canvas.width, Math.min(imgHeight, canvas.height)), 0, 0)
      pdf.addImage(page.toDataURL("image/jpeg", 1.0), "JPEG", 10, 10, a4w, Math.min(a4h, a4w * page.height / page.width))

      count++;
      if (count != getCanvas.length) pdf.addPage()

      if (count == getCanvas.length) pdf.save(title + '.pdf')
    })
  }
}