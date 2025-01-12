import PDFDocument from "pdfkit";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Utility to convert cm to mm
const cmToMM = (cm) => Number(cm) * 10;

const generatePDF = (
  voucherNumber,
  expiryDate,
  generatedDate,
  title,
  pageW,  // in cm
  pageH,  // in cm
  titleSize,
  textSize
) => {
  // Convert page dimensions from cm to mm (multiply by 10)
  pageW = cmToMM(pageW);
  pageH = cmToMM(pageH);

  
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

    // Title
    doc.fontSize(titleSize).text(title, { align: "center", underline: true });
    doc.moveDown(1);

    // Generated date
    doc
      .fontSize(textSize)
      .text(`Generated on: ${new Date(generatedDate).toLocaleDateString()}`, {
        align: "center",
      });
    doc.moveDown(1);

    // QR Code
    const qrImagePath = path.join(
      __dirname,
      "../../public/vouchers/qrcode_" + voucherNumber + ".png"
    );

    const qrCodeWidth = 250;
    const qrCodeHeight = 250;
    const pageWidth = doc.page.width;
    const xPosition = (pageWidth - qrCodeWidth) / 2;

    if (fs.existsSync(qrImagePath)) {
      doc.image(qrImagePath, xPosition, doc.y, {
        width: qrCodeWidth,
        height: qrCodeHeight,
      });
    } else {
      console.warn(`QR Code image not found: ${qrImagePath}`);
    }

    doc.moveDown(0.1);

    // Expiry date
    doc
      .fontSize(textSize)
      .text(`Expiry Date: ${new Date(expiryDate).toLocaleDateString()}`, {
        align: "center",
      });

    doc.end();

    stream.on("finish", () => resolve(stream.path));
    stream.on("error", reject);
  });
};

export default generatePDF;
