import { Keypair, Networks, TransactionBuilder, Operation, Asset, Horizon } from "@stellar/stellar-sdk";

const server = new Horizon.Server("https://horizon-testnet.stellar.org");

export async function fundAccount(publicKey: string) {
  await fetch(`https://friendbot.stellar.org?addr=${publicKey}`);
}

export async function sendScholarship(
  senderSecret: string,
  recipientPublic: string,
  amount: string
) {
  const senderKeypair = Keypair.fromSecret(senderSecret);
  const account = await server.loadAccount(senderKeypair.publicKey());

  const transaction = new TransactionBuilder(account, {
    fee: "100",
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(
      Operation.payment({
        destination: recipientPublic,
        asset: Asset.native(),
        amount: amount,
      })
    )
    .setTimeout(30)
    .build();

  transaction.sign(senderKeypair);
  return await server.submitTransaction(transaction);
}
