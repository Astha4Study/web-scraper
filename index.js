const PORT = 8000;

import axios from 'axios';
import express from 'express';
import * as cheerio from 'cheerio';

const scrapper = express();

const url = "https://id.wikipedia.org/wiki/Artikel"; //Contoh URL yang ingin diambil

axios(url).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];

    $('.templatequote', html).each(function() {
        const title = $(this).text();
        const link = $(this).find('a').attr('href')
        articles.push({
            title: title,
            link: link ? `https://id.wikipedia.org${link}` : null, 
        });
    });
    console.log(articles);
}).catch(err => console.log(err));

scrapper.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


