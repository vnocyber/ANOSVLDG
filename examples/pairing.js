
import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from 'anosvldg';

import readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const rl = readline.createInterface({
  input: stdin,
  output: stdout
});

const SESSION = './session';

async function startBot() {
  const { state, saveCreds } =
    await useMultiFileAuthState(SESSION);

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    markOnlineOnConnect: false
  });

  sock.ev.on('creds.update', saveCreds);

  if (!state.creds.registered) {
    const number = await rl.question(
      'Masukkan nomor WhatsApp (628xxxx): '
    );

    const phone = number.replace(/\D/g, '');

    if (!/^\d{8,15}$/.test(phone)) {
      throw new Error('Nomor WhatsApp tidak valid.');
    }

    const code = await sock.requestPairingCode(phone);

    console.log('\nANOSVLDG PAIRING');
    console.log('Kode resmi WhatsApp:', code);
    console.log('Masukkan kode melalui menu Perangkat Tertaut.');
  }

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'connecting') {
      console.log('Menghubungkan ke WhatsApp...');
    }

    if (connection === 'open') {
      console.log('ANOSVLDG berhasil terhubung.');
      rl.close();
    }

    if (connection === 'close') {
      const statusCode =
        lastDisconnect?.error?.output?.statusCode;

      console.log('Koneksi terputus:', statusCode);

      if (statusCode === DisconnectReason.loggedOut) {
        console.log('Session telah logout. Hubungkan ulang.');
      } else {
        console.log('Jalankan ulang untuk mencoba koneksi.');
      }
    }
  });

  return sock;
}

startBot().catch((error) => {
  console.error('ANOSVLDG ERROR:', error);
  rl.close();
  process.exitCode = 1;
});
             
