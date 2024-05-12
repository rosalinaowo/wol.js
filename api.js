const express = require('express');
const cors = require('cors');
const wol = require('./wol.js');

const app = express();
const port = 9999;

app.use(cors()).use(express.json());

app.post('/', (req, res) => {
    const { macAddress, options } = req.body;

    if(!macAddress) {
        return res.status(400).json({ status: 'error', message: 'MAC address required' });
    }

    wol.sendMagicPacket(macAddress, options)
    .then(status => {
        console.log(status);
        res.json(status);
    })
    .catch(error => {
        console.error(error);
        res.status(500).json(error);
    })
});

app.get('/', (req, res) => {
    const macAddress = req.query.macAddress;

    if(!macAddress) {
        return res.status(400).json({ status: 'error', message: 'MAC address required' });
    }

    wol.sendMagicPacket(macAddress)
    .then(status => {
        console.log(status);
        res.json(status);
    })
    .catch(error => {
        console.error(error);
        res.status(500).json(error);
    })
});

app.listen(port, () => {
    console.log('Server running on port ' + port);
});