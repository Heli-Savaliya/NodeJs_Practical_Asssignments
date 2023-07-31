const fs = require('fs');
const archiver = require('archiver');

function createZipArchive(sourceFolder, zipFileName) {
  // Create a write stream for the zip file
  const output = fs.createWriteStream(zipFileName);

  // Create an archiver instance
  const archive = archiver('zip', {
    zlib: { level: 9 } // Compression level (0-9); 9 is the highest compression
  });

  // Listen for events to handle errors
  output.on('close', () => {
    console.log(`Archive created: ${zipFileName}`);
  });

  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
      console.warn(err);
    } else {
      throw err;
    }
  });

  archive.on('error', (err) => {
    throw err;
  });

  // Pipe the archive data to the output stream
  archive.pipe(output);

  // Append the folder to the archive
  archive.directory(sourceFolder, false);

  // Finalize the archive (writes the zip file)
  archive.finalize();
}

// Usage example:
const sourceFolder = './Sem7_Node_practice'; // Replace with the path to your folder
const zipFileName = 'Sem7_Node_practice.zip'; // Replace with the desired zip file name

createZipArchive(sourceFolder, zipFileName);
