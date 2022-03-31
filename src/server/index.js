const express = require("express");
const app = express();
const port = 3000;

const https = require('https');
const fs = require('fs');
const options = {
  key: fs.readFileSync(`./src/server/localhost-key.pem`),
  cert: fs.readFileSync(`./src/server/localhost.pem`)
};
const httpsServer = https.createServer(options, app);

function setHeader(params) {
  let { method = "get", fileUrl, sendFileUrl, options } = params;
  app[method](fileUrl, (req, res) => {
    res.sendFile(
      sendFileUrl ? sendFileUrl : fileUrl,
      {
        root: __dirname,
        // 关闭默认开启的缓存设置
        lastModified: false,
        etag: false,
        cacheControl: false,
        ...options,
      },
      function (err) {}
    );
  });
}

setHeader({
  fileUrl: "/index.html",
  sendFileUrl: "/index.html",
  options: {
    headers: {
      "Content-type": "text/html",
    },
  },
});


// 设置缓存头部
setHeader({
  fileUrl: "/assets/no_cache_setting.js",
  options: {
    root: __dirname,
  },
});

setHeader({
  fileUrl: "/assets/expires.js",
  options: {
    headers: {
      Expires: "Sun, 30 Mar 2022 01:18:21 GMT",
    },
  },
});

setHeader({
  fileUrl: "/assets/cache-control.js",
  options: {
    root: __dirname,
    headers: {
      "Cache-Control": "public, max-age=36000",
    },
    cacheControl: true,
  },
});

setHeader({
  fileUrl: "/assets/Last-Modified.js",
  options: {
    root: __dirname,
    headers: {
      "Last-Modified": "Sat, 28 Mar 2022 13:08:14 GMT",
    },
    lastModified: true,
  },
});

setHeader({
  fileUrl: "/assets/Etag.js",
  options: {
    root: __dirname,
    // headers: {
    //     "ETag": '312321323'
    // },
    etag: true,
  },
});

setHeader({
  fileUrl: "/ServiceWorker.js",
  options: {
    root: __dirname,
  },
});

app.use('/imgs',express.static(__dirname + '/assets/imgs'))
httpsServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// 静态资源
// app.use('/assets', express.static(__dirname + '/assets',{
//     // 设置默认头部
//     etag:false,
//     lastModified:false
// }));
