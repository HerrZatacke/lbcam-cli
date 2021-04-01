const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers')
const {PNG} = require('pngjs');
const filterPipeline = require('./filterPipeline');

const argv = yargs(hideBin(process.argv)).argv

const files = argv._;

if (!files.length) {
  console.log('no file(s) specified');
}

files.forEach((filename) => {

  if (filename.endsWith('.converted.png')) {
    return;
  }

  if (path.extname(filename) !== '.png') {
    console.log(`${filename} is not a .png - skipping`);
    return;
  }

  try {
    fs.accessSync(filename, fs.R_OK);

    const outName = `${path.basename(filename,  path.extname(filename))}.converted.png`;

    console.log(`creating ${outName}`);

    fs.createReadStream(filename)
      .pipe(new PNG())
      .on('parsed', function () {
        filterPipeline(this.data, {
          brightness: typeof argv.brightness !== 'undefined' ? argv.brightness : 10,
          contrast: typeof argv.contrast !== 'undefined' ? argv.contrast : 4,
          lowLight: typeof argv.lowLight !== 'undefined',
        });
        this.pack().pipe(fs.createWriteStream(outName));
      })

  } catch (err) {
    console.log(err);
    console.log(`cannot access ${filename} - skipping`);
  }

});

