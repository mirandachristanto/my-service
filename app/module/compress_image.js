// input : upload ke folder temp
// output: hasil compress masuk di folder UPLOAD
var compress_images = require('compress-images');
const path = require('path')
const fs = require('fs')

module.exports = {
    compress: function (file_path) {
        console.log(fs.existsSync(file_path))
        console.log(file_path)
        compress_images(file_path, path.join(__dirname, '/../../public/upload/'), { compress_force: false, statistic: true, autoupdate: true }, false,
            { jpg: { engine: 'mozjpeg', command: ['-quality', '60'] } },
            { png: { engine: 'pngquant', command: ['--quality=20-50'] } },
            { svg: { engine: 'svgo', command: '--multipass' } },
            { gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] } }, function (error, completed, statistic) {
                console.log('-------------');
                console.log(error);
                console.log(completed);
                console.log(statistic);
                console.log('-------------');
                if (!error && fs.existsSync(file_path))
                    fs.unlinkSync(file_path);
            });
    }
}

