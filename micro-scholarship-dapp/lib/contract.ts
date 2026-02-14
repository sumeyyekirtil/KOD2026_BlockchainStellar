import {
  Address,
  Contract,
  Networks,
  rpc,
  TransactionBuilder,
  BASE_FEE,
  xdr,
} from "@stellar/stellar-sdk";

import {
  signTransaction,
  getPublicKey,
  isConnected,
} from "@stellar/freighter-api";

// ===============================
// CONFIG
// ===============================

const RPC_URL = "https://soroban-testnet.stellar.org";
const NETWORK_PASSPHRASE = Networks.TESTNET;

// 🔥 BURAYA DEPLOY ETTİĞİN CONTRACT ID'Yİ KOY
const CONTRACT_ID = "YOUR_CONTRACT_ID_HERE";

// ===============================
// CONNECT WALLET
// ===============================

export async function connectWallet(): Promise<string> {
  const connected = await isConnected();

  if (!connected) {
    throw new Error("Freighter wallet not connected");
  }

  const publicKey = await getPublicKey();
  return publicKey;
}

// ===============================
// GM CALL
// ===============================

export async function sendGM() {
  const publicKey = await connectWallet();

  const server = new rpc.Server(RPC_URL);
  const contract = new Contract(CONTRACT_ID);

  const account = await server.getAccount(publicKey);

  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(
      contract.call(
        "gm",
        Address.fromString(publicKey).toScVal()
      )
    )
    .setTimeout(30)
    .build();

  const preparedTx = await server.prepareTransaction(tx);

  const signedXDR = await signTransaction(
    preparedTx.toXDR(),
    NETWORK_PASSPHRASE
  );

  const signedTx = TransactionBuilder.fromXDR(
    signedXDR,
    NETWORK_PASSPHRASE
  );

  const result = await server.sendTransaction(signedTx);

  return result;
}

// ===============================
// GN CALL
// ===============================

export async function sendGN() {
  const publicKey = await connectWallet();

  const server = new rpc.Server(RPC_URL);
  const contract = new Contract(CONTRACT_ID);

  const account = await server.getAccount(publicKey);

  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(
      contract.call(
        "gn",
        Address.fromString(publicKey).toScVal()
      )
    )
    .setTimeout(30)
    .build();

  const preparedTx = await server.prepareTransaction(tx);

  const signedXDR = await signTransaction(
    preparedTx.toXDR(),
    NETWORK_PASSPHRASE
  );

  const signedTx = TransactionBuilder.fromXDR(
    signedXDR,
    NETWORK_PASSPHRASE
  );

  const result = await server.sendTransaction(signedTx);

  return result;
}

// ===============================
// READ STATS
// ===============================

export async function getStats() {
  const publicKey = await connectWallet();

  const server = new rpc.Server(RPC_URL);
  const contract = new Contract(CONTRACT_ID);

  const account = await server.getAccount(publicKey);

  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(
      contract.call(
        "get_stats",
        Address.fromString(publicKey).toScVal()
      )
    )
    .setTimeout(30)
    .build();

  const preparedTx = await server.prepareTransaction(tx);

  const result = await server.simulateTransaction(preparedTx);

  if (!result.result) {
    throw new Error("No result from contract");
  }

  return result.result;
}
