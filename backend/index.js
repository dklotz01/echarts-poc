const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const echarts = require('echarts');
const PDFDocument = require('pdfkit');
const sharp = require('sharp');

app.use(express.json());
app.use(cors());

app.post('/chart', (req, res) => {
  const data = req.body;
  const chart = echarts.init(null, null, {
    renderer: 'svg',
    ssr: true,
    width: 400,
    height: 300
  });
  chart.setOption({
    series: [
      {
        type: 'pie',
        data: data.map((item) => ({ value: item.value, name: item.label })),
      },
    ],
  });
  const svg = chart.renderToSVGString();
  res.set("Content-Type", "image/svg+xml");
  res.set("Access-Control-Allow-Origin", "*");
  res.send(svg);
});

app.post('/generate-pdf', async (req, res) => {
  const data = req.body;
  const chart = echarts.init(null, null, {
    renderer: 'svg',
    ssr: true,
    width: 400,
    height: 300
  });
  chart.setOption({
    series: [
      {
        type: 'pie',
        data: data.map((item) => ({ value: item.value, name: item.label })),
      },
    ],
  });
  const svg = chart.renderToSVGString();
  const png = await sharp(Buffer.from(svg)).toFormat('png').toBuffer();
  const doc = new PDFDocument();
  doc.pipe(res);
  doc.fontSize(25).text('Pizzas Report', 100, 100);
  doc.image(png, 100, 150, { width: 400 });
  doc.end();
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
