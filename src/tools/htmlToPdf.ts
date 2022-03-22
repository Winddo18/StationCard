// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

export const getPdf = () => {
  var pdf = new JsPDF() // A4纸，纵向
  var renderedHeight = 0
  const getCanvas = document.getElementsByClassName('get')
  for (let i = 0; i < getCanvas.length; i++) {
    var count = 0;
    html2Canvas(getCanvas.item(i) as HTMLElement, {
      allowTaint: true,
      scrollY: 0,
      scrollX: 0,
    }).then(function (canvas) {
      let canvasHeight = 160 * canvas.height / canvas.width + 10 // 加间隔
      if (renderedHeight + canvasHeight >= 297) {
        pdf.addPage()
        renderedHeight = 0
      }
      pdf.addImage(canvas, "JPEG", 10, 10 + renderedHeight, 160, Math.min(190, 160 * canvas.height / canvas.width))
      renderedHeight += canvasHeight
      count++;
      if (count == getCanvas.length) pdf.save('预览图' + '.pdf')
    })
  }
}