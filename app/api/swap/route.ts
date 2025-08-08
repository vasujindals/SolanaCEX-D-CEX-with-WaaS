import { authConfig } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";
import { Connection, Keypair, VersionedTransaction, PublicKey } from "@solana/web3.js";

export async function POST(req: NextRequest) {
  const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=d664293e-8f23-41cb-9457-5bd5ea92fba0");

  const data: { quoteResponse: any } = await req.json();

  const session = await getServerSession(authConfig);
  if (!session?.user) {
    return NextResponse.json({ message: "You are not logged in" }, { status: 401 });
  }

  const solWallet = await db.solWallet.findFirst({
    where: { userId: session.user.uid }
  });

  if (!solWallet) {
    return NextResponse.json({ message: "Could not find associated Solana wallet" }, { status: 401 });
  }

  // ✅ Check SOL balance
  const solBalance = await connection.getBalance(new PublicKey(solWallet.publicKey));
  if (solBalance === 0) {
    return NextResponse.json({ message: "Insufficient SOL balance for swap" }, { status: 400 });
  }

  // ✅ Fetch transaction from Jupiter (with error handling)
  let swapTransaction;
  try {
    const response = await fetch("https://quote-api.jup.ag/v6/swap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quoteResponse: data.quoteResponse,
        userPublicKey: solWallet.publicKey,
        wrapAndUnwrapSol: true
      })
    });

    const json = await response.json();
    swapTransaction = json.swapTransaction;
  } catch (err) {
    console.error("Error fetching swap transaction from Jupiter:", err);
    return NextResponse.json({ message: "Failed to get transaction from Jupiter" }, { status: 500 });
  }

  if (!swapTransaction) {
    return NextResponse.json({ message: "No transaction received from Jupiter" }, { status: 500 });
  }

  // ✅ Deserialize and prepare transaction
  const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
  const transaction = VersionedTransaction.deserialize(new Uint8Array(swapTransactionBuf));
  const privateKey = getPrivateKeyFromDb(solWallet.privateKey);

  // ✅ Refresh blockhash BEFORE signing
  const latestBlockHash = await connection.getLatestBlockhash();
  transaction.message.recentBlockhash = latestBlockHash.blockhash;
  transaction.sign([privateKey]);

  // ✅ Send and confirm transaction
  const rawTransaction = transaction.serialize();
  const txid = await connection.sendRawTransaction(rawTransaction, {
    skipPreflight: true,
    maxRetries: 2
  });

  await connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: txid
  });

  return NextResponse.json({ txid });
}

// 🔐 Convert DB private key string to Solana Keypair
function getPrivateKeyFromDb(privateKey: string): Keypair {
  const arr = privateKey.split(",").map(Number);
  return Keypair.fromSecretKey(Uint8Array.from(arr));
}
