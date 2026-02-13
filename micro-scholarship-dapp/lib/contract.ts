"use client";

import {
  Address,
  Contract,
  nativeToScVal,
  scValToNative,
  TransactionBuilder,
  Networks,
  BASE_FEE,
  rpc,
} from "@stellar/stellar-sdk";
import {
  signTransaction,
  getUserInfo,
} from "@stellar/freighter-api";

const contractId = process.env.NEXT_PUBLIC_CONTRACT_ID!;
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL!;
const networkPassphrase =
  process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE!;

// RPC server oluşturuyoruz
const server = new rpc.Server(rpcUrl);

// Contract instance
const contract = new Contract(contractId);

async function buildAndSend(method: string, args: any[]) {
  try {
    const user = await getUserInfo();

    // Account bilgisi alıyoruz
    const account = await server.getAccount(user.publicKey);

    const tx = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase,
    })
      .addOperation(
        contract.call(
          method,
          ...args.map((a) => nativeToScVal(a))
        )
      )
      .setTimeout(30)
      .build();

    // Soroban simulation
    const simulated = await server.simulateTransaction(tx);

    const prepared = rpc.assembleTransaction(tx, simulated);

    // Freighter ile imzalıyoruz
    const signedXdr = await signTransaction(
      prepared.toXDR(),
      networkPassphrase
    );

    const signedTx = rpc.TransactionBuilder.fromXDR(
      signedXdr,
      networkPassphrase
    );

    const result = await server.sendTransaction(signedTx);

    return result;
  } catch (err) {
    console.error("Transaction error:", err);
    throw err;
  }
}

// Scholar bağışı
export async function fundScholar() {
  const user = await getUserInfo();
  return buildAndSend("fund_scholar", [user.publicKey]);
}

// Project bağışı
export async function fundProject() {
  const user = await getUserInfo();
  return buildAndSend("fund_project", [user.publicKey]);
}

// Global scholar count
export async function getTotalScholar() {
  const result = await server.invokeContractFunction(
    contractId,
    "get_total_scholar",
    []
  );

  return scValToNative(result.result.retval);
}

// Global project count
export async function getTotalProject() {
  const result = await server.invokeContractFunction(
    contractId,
    "get_total_project",
    []
  );

  return scValToNative(result.result.retval);
}
