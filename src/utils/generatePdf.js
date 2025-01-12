import PDFDocument from "pdfkit";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generatePDF = (
  voucherNumber,
  title,
  expiryDate,
  pageW,
  pageH,
  titleSize,
  textSize
) => {
  console.log(__dirname);

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: [pageW, pageH], 
    });

    const streamPath = path.join(
      __dirname,
      `../../public/pdfs/${voucherNumber}.pdf`
    );
    console.log({ streamPath });

    const stream = fs.createWriteStream(streamPath);

    doc.pipe(stream);

    doc.fontSize(titleSize).text(title, { align: "center", underline: true });
    doc.moveDown(1); 

    doc
      .fontSize(textSize)

      .text(`Generated on: ${new Date().toLocaleDateString()}`, {
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

    // Add QR code (ensure the path is correct)
    doc.image(qrImagePath, xPosition, doc.y, {
      width: qrCodeWidth,
      height: qrCodeHeight,
    });
    doc.moveDown(0.2); 

    doc.fontSize(textSize).text(`Expiry Date: ${expiryDate}`, {
      align: "center",
    });

    doc.end();

    stream.on("finish", () => resolve(stream.path)); // Return the PDF path when done
    stream.on("error", reject);
  });
};

export default generatePDF;
