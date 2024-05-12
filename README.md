# wol.js
Node.js Wake-on-LAN server

## Running
 - WoL server: ```npm run start```
 - WoL server with JSON database: ```npm run all```

## Usage
### WoL script
```javascript
const wol = require('./wol.js');

wol.sendMagicPacket(macAddress, options)
.then (status => console.log(status))
.catch (error => console.log(error))
```
### WoL API
```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "macAddress": "00:AA:BB:CC:DD:EE",
  "options": { "address": "255.255.255.255", "port": "9" }
}' http://localhost:9999/
```

## Options (optional)
 - `address`: broadcast address to send the magic packet to, default is `255.255.255.255`
 - `port`: port to send the magic packet to, default is `9`