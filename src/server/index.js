const express = require('express')
const app = express()
const port = 3000


setHeader({
    fileUrl: '/', sendFileUrl: 'index.html', options: {
        root: __dirname,
        headers: {
            "Content-type": "text/html"
        }
    }
})

app.set('etag', false)
function setHeader(params) {
    let { method = 'get', fileUrl, sendFileUrl, options } = params
    app[method](fileUrl, (req, res) => {
        res.sendFile(sendFileUrl ? sendFileUrl : fileUrl, options, function (err) {
            // if (err) {
            //     console.log('fail:',`${method}:${err}`)
            // }
            // else {
            //     console.log(`${method}success`)
            // }
        })
    })
}

// 设置缓存头部
setHeader({
    fileUrl: '/assets/no_cache_setting.js', options: {
        root: __dirname
    }
})

setHeader({
    fileUrl: '/assets/expires.js', options: {
        root: __dirname,
        headers: {
            "Expires": 'Sun, 28 Mar 2022 01:18:21 GMT'
        },
        lastModified: false,
        etag: false,
        cacheControl: false
    }
})


setHeader({
    fileUrl: '/assets/cache-control.js', options: {
        root: __dirname,
        headers: {
            "Cache-Control": 'public, max-age=36000'
        },
        lastModified: false,
        etag: false,
    }
})

setHeader({
    fileUrl: '/assets/Last-Modified.js', options: {
        root: __dirname,
        headers: {
            "Last-Modified": 'Sat, 28 Mar 2022 13:08:14 GMT'
        },
        etag: false,
        cacheControl: false
    }
})

setHeader({
    fileUrl: '/assets/Etag.js', options: {
        root: __dirname,
        // headers: {
        //     "ETag": '312321323'
        // },
        lastModified: false,
        cacheControl: false
    }
})


setHeader({
    fileUrl: '/assets/ServiceWorker.js', options: {
        root: __dirname,
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// 静态资源
// app.use('/assets', express.static(__dirname + '/assets',{
//     // 设置默认头部
//     etag:false,
//     lastModified:false
// }));
// app.use(express.static('/assets'))