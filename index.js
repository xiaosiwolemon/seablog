import * as cheerio from 'cheerio';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import path from 'path';
import { downloadPDF } from './downloadPDF.js';
import { easyPDFmerge } from './easyPDFmerge.js';

// const baozhi = 'http://paper.people.com.cn/rmrb/html/2022-04/03/nbs.D110000renmrb_01.htm'
const baozhi = 'https://paper.people.com.cn/rmrb/pc/layout/202505/21/node_01.html'

getData({
    baozhi
})

async function getData({ baozhi }) {
    const { data } = await axios({
        method: 'get',
        url: baozhi,
    });
    const $ = cheerio.load(data);

    const xx = []
    $('#pageLink').each((x, element) => {

        const b = $(element)
        const c = {
            name: b.text(),
            link: new URL(b.attr().href, baozhi).href
        }
        xx.push(c)
    })


    const savePathList = []
    for (let p of xx) {
        const xaf = await axios.get(p.link).then(res => res.data)
        const pdfLink = cheerio.load(xaf)('.paper-bot a').attr().href
        console.log(pdfLink)

        const newBaozhi = new URL(pdfLink, baozhi).href
        console.log(newBaozhi)

        // 本地保存路径
        const savePath = path.resolve(__dirname, 'downloaded_file' + p.name.replaceAll(' ', '_') + '.pdf');
        await downloadPDF(newBaozhi, savePath)
        savePathList.push(savePath)
    }

    easyPDFmerge({
        sourceFiles: savePathList,
        outputFile: path.resolve(__dirname, 'fsdsf.pdf')
    })
}










