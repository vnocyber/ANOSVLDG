
# ANOSVLDG

**Personal WhatsApp Web API Library**

ANOSVLDG is a personal package wrapper built on top of Baileys.

## Installation

Add this to your bot's package.json:

```json
{
  "dependencies": {
    "anosvldg": "github:vnocyber/ANOSVLDG"
  }
}
```

Install:

```bash
npm install
```

## Import

```javascript
import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  Browsers
} from 'anosvldg';
```

## Basic Usage

```javascript
import makeWASocket, {
  useMultiFileAuthState
} from 'anosvldg';

async function start() {
  const { state, saveCreds } =
    await useMultiFileAuthState('./session');

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', ({ connection }) => {
    if (connection === 'open') {
      console.log('ANOSVLDG Connected!');
    }
  });

  return sock;
}

start().catch(console.error);
```

## Pairing Code

See:

`examples/pairing.js`

## QR Code

See:

`examples/qr.js`

For QR example, install:

```bash
npm install qrcode-terminal
```

## Package Information

- Package: anosvldg
- Version: 1.0.0
- Owner: vnocyber
- Runtime: Node.js 20.19+
- Module system: ES Modules
- Base library: Baileys

## Important

ANOSVLDG forwards the official Baileys API.

It does not independently implement the WhatsApp protocol.

WhatsApp generates the official pairing code. The text ANOSVLDG is the library identity and cannot be forced as the WhatsApp-issued pairing code.

Session credentials must never be uploaded to GitHub.

ANOSVLDG is an unofficial third-party project and is not affiliated with WhatsApp or Meta.

Use responsibly and comply with applicable WhatsApp terms.

## Repository

https://github.com/vnocyber/ANOSVLDG
