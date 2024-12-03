const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const echarts = require('echarts');

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

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
