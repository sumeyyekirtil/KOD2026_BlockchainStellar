import {
  Keypair,
  Horizon,
  Networks,
  TransactionBuilder,
  Operation,
  Asset,
} from "@stellar/stellar-sdk";

const server = new Horizon.Server("https://horizon-testnet.stellar.org");

// Testnet hesap oluştur (Friendbot)
export async function createTestAccount() {
  const pair = Keypair.random();

  const response = await fetch(
    `https://friendbot.stellar.org?addr=${pair.publicKey()}`
  );

  if (!response.ok) {
    throw new Error("Friendbot failed");
  }

  return pair;
}

// XLM transfer fonksiyonu
export async function sendXLM(
  sourceSecret: string,
  destination: string,
  amount: string
) {
  const sourceKeypair = Keypair.fromSecret(sourceSecret);

  const account = await server.loadAccount(sourceKeypair.publicKey());

  const transaction = new TransactionBuilder(account, {
    fee: "100",
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(
      Operation.payment({
        destination,
        asset: Asset.native(),
        amount,
      })
    )
    .setTimeout(30)
    .build();

  transaction.sign(sourceKeypair);

  const result = await server.submitTransaction(transaction);

  return result.hash;
}