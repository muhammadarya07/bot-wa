import { Client, ClientInfo } from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal'
const client = new Client()
const clientInfo = new ClientInfo()

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.on('message_create', async (msg) => {
    switch (msg.body) {
        case '.menu':
            client.sendMessage(msg.from, 'Baru ada fitur stiker kak, caranya kirim gambar abis itu kasih caption .stiker')
            break
        case '.stiker':
            // jika tidak ada gambar yang dikirim
            if (!msg.hasMedia) {
                client.sendMessage(msg.from, 'Silahkan kirim gambar juga!')
                break
            }
            const image = await msg.downloadMedia()
            client.sendMessage(msg.from, image, { sendMediaAsSticker: true, stickerAuthor: 'Sanzboyy' })
            client.sendMessage(msg.from, 'Ini stikermu kak')
            client.sendMessage(clientInfo.wid, `${(await msg.getContact()).name} bikin stiker`)
            break
        case 'ping':
            msg.reply('apaan ping2an anj')
            break
        default:
            break
    }
})

client.initialize();