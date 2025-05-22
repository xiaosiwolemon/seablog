import axios from 'axios';
import fs from 'node:fs'


// 使用axios下载PDF并保存到本地
export async function downloadPDF(pdfUrl, savePath) {
    try {
        const response = await axios({
            method: 'get',
            url: pdfUrl,
            responseType: 'stream'
        });

        const writer = fs.createWriteStream(savePath);

        // 用 Promise 封装写入完成的过程
        await new Promise((resolve, reject) => {
            response.data.pipe(writer);
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        console.log('PDF downloaded and saved to', savePath);
    } catch (error) {
        console.error('Error downloading PDF:', error);
    }
}