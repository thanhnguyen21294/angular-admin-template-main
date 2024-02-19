export interface FileUploaded {
  size: number;
  filepath: string;
  newFilename: string;
  mimetype: string;
  mtime: Date,
  originalFilename: string;
}
