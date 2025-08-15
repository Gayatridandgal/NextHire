import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import fs from 'fs';

export const parsePDFBuffer = async (buffer) => {
  const data = await pdfParse(buffer);
  return cleanText(data.text);
};

export const parseDOCXFile = async (filepath) => {
  const { value } = await mammoth.extractRawText({ path: filepath });
  return cleanText(value);
};

const cleanText = (txt = '') =>
  txt
    .replace(/\r/g, ' ')
    .replace(/\t/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();

// Auto-detect by extension
export const parseResumeFile = async (file) => {
  const ext = (file.originalname.split('.').pop() || '').toLowerCase();
  if (ext === 'pdf') {
    return parsePDFBuffer(fs.readFileSync(file.path));
  }
  if (ext === 'docx') {
    return parseDOCXFile(file.path);
  }
  throw new Error('Unsupported file type. Use PDF or DOCX');
};
