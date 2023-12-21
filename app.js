import express from 'express'
import fs from 'fs'
import moment from 'moment'
import mime from 'mime'

const app = express()
const port = 3000

app.get('/api/miao', (req, res) => {
    let name = req.query.name
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] 访问者IP: ${ip}，name：${name}`)

    if (!name || !fs.existsSync(`./data/normal-character/${name}`)) {
        if (!name) {
            let folders = fs.readdirSync('./data')
            name = folders[Math.floor(Math.random() * folders.length)]
        } else {
            res.status(404).send({ error: '不存在此目录。' })
            return
        }
    }

    fs.readdir(`./data/normal-character/${name}`, (err, files) => {
        if (err) {
            res.status(500).send({ error: '读取目录时发生错误。' })
        } else if (files.length === 0) {
            res.status(404).send({ error: '目录为空。' })
        } else {
            let randomFile = files[Math.floor(Math.random() * files.length)]
            let filePath = `${process.cwd()}/data/normal-character/${name}/${randomFile}`
            console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] 返回的图片: ${filePath}`)

            let type = mime.getType(filePath)
            res.setHeader('Content-Type', type)
            res.setHeader('Content-Disposition', 'inline')
            res.sendFile(filePath)
        }
    })
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send({ error: '服务器内部错误。' })
})

app.listen(port, '0.0.0.0', () => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] 服务器正在运行于 http://127.0.0.1:${port}/api/miao`)
})
