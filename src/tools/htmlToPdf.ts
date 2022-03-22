// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'


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