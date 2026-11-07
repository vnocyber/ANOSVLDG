
import makeWASocket, {
  useMultiFileAuthState
} from 'anosvldg';

import qrcode from 'qrcode-terminal';

async function startBot() {
  const { state, saveCreds } =
    await useMultiFileAuthState('./session-qr');

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', ({ connection, qr }) => {
    if (qr) {
      console.log('SCAN QR ANOSVLDG:');
      qrcode.generate(qr, { small: true });
    }

    if (connection === 'open') {
      console.log('ANOSVLDG connected!');
    }

    if (connection === 'close') {
      console.log('WhatsApp disconnected.');
    }
  });

  return sock;
}

startBot().catch(console.error);
