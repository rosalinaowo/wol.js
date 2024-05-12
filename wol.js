const dgram = require('dgram');
const net = require('net');

exports.createMagicPacket = (macAddress) => {
    const mac = macAddress.split(':').map(hex => parseInt(hex, 16));
    const magicPacket = Buffer.alloc(6 + 16 * mac.length);

    // Fill the first 6 bytes with 0xFF
    magicPacket.fill(0xFF, 0, 6);

    // Repeat the MAC address 16 times
    for(let i = 6; i < magicPacket.length; i += mac.length) {
        mac.forEach((byte, index) => {
            magicPacket[i + index] = byte;
        });
    }

    return magicPacket;
}

exports.sendMagicPacket = (macAddress, options) => {
    return new Promise((resolve, reject) => {
        var _options = {
            address: (options && options.address) ? options.address : '255.255.255.255',
            port: (options && options.port) ? options.port : 9
        };
    
        const magicPacket = exports.createMagicPacket(macAddress);
        const protocol = net.isIPv6(_options.address) ? 'udp6' : 'udp4';
        const socket = dgram.createSocket(protocol);
    
        var status;
        socket.bind(() => {
            socket.setBroadcast(true);
            socket.send(magicPacket, 0, magicPacket.length, _options.port, _options.address, (err) => {
                if(err) {
                    status = { status: 'error', message: 'Error sending magic packet:' + err };
                    reject(status);
                } else {
                    status = { status: 'ok', message: 'Magic packet sent successfully' };
                    resolve(status);
                }
                socket.close();
            });
        });
    });
}