import PDFDocument from "pdfkit";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generatePDF = (
  voucherNumber,
  expiryDate,
  generatedDate,
  title,
  pageW,
  pageH,
  titleSize,
  textSize
) => {


  console.log({
    voucherNumber,
    expiryDate,
    generatedDate,
    title,
    pageW,
    pageH,
    titleSize,
    textSize,
  });
  
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: [pageW, pageH],
    });

    const streamPath = path.join(
      __dirname,
      `../../public/pdfs/${voucherNumber}.pdf`
    );

    const stream = fs.createWriteStream(streamPath);

    doc.pipe(stream);

    doc.fontSize(titleSize).text(title, { align: "center", underline: true });
    doc.moveDown(1);

    doc
      .fontSize(textSize)

      .text(`Generated on: ${new Date(generatedDate).toLocaleDateString()}`, {
        align: "center",
      });
    doc.moveDown(1);

    const qrImagePath = path.join(
      __dirname,
      "../../public/vouchers/qrcode_" + voucherNumber + ".png"
    );

    const qrCodeWidth = 250;
    const qrCodeHeight = 250;

    const pageWidth = doc.page.width;
    const xPosition = (pageWidth - qrCodeWidth) / 2;
   
    //change pdf bg color
    doc.image(qrImagePath, xPosition, doc.y, {
      width: qrCodeWidth,
      height: qrCodeHeight,
    });
    doc.moveDown(0.1);

    doc.fontSize(textSize).text(`Expiry Date: ${new Date(expiryDate).toLocaleDateString()}`, {
      align: "center",
    });

    doc.end();

    stream.on("finish", () => resolve(stream.path)); 
    stream.on("error", reject);
  });
};

export default generatePDF;
