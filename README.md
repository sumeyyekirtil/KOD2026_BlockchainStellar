<h1 align="center">🚀 CODE 2026: Break the AI ​​Chains with Code</h1>

<p align="center">
A blockchain-powered micro scholarship infrastructure built on Stellar.<br/>
Empowering decentralized education funding through smart contracts and clean architecture.
</p>

---

<h2>🎯 Project Vision</h2>

<p>
<strong>KOD 2026</strong> is a decentralized micro-scholarship protocol designed to remove
centralized control from education funding systems.
</p>

<p>
It combines:
</p>

<ul>
  <li>Smart contract logic (Soroban)</li>
  <li>Stellar blockchain infrastructure</li>
  <li>Rust-based contract development</li>
  <li>Next.js frontend interface</li>
</ul>

<p>
The goal: automate transparent scholarship transfers using programmable logic.
</p>

---

<h2>🏗 System Architecture</h2>

<h3>1️⃣ Smart Contract Layer (Soroban)</h3>

<p>
The contract is written in <strong>Rust</strong> and compiled to WebAssembly.
It defines the rules for scholarship distribution.
</p>

<ul>
  <li>Validates transaction logic</li>
  <li>Executes token transfers</li>
  <li>Enforces programmable funding conditions</li>
  <li>Runs trustlessly on Stellar network</li>
</ul>

<p>
The contract ensures that funds are distributed according to predefined rules,
without intermediaries.
</p>

---

<h3>2️⃣ Cargo Configuration</h3>

<p>
The <code>Cargo.toml</code> file manages the Rust contract environment.
</p>

<p>
It defines:
</p>

<ul>
  <li>Project metadata (name, version, edition)</li>
  <li>Dependencies (soroban-sdk)</li>
  <li>Compilation settings</li>
  <li>WASM build target</li>
</ul>

<p>
Cargo acts as the build engine for compiling the smart contract into a deployable WASM artifact.
</p>

---

<h3>3️⃣ Blockchain Layer (Stellar)</h3>

<p>
The Stellar network provides:
</p>

<ul>
  <li>Fast transaction finality</li>
  <li>Low-cost transfers</li>
  <li>Secure keypair-based authentication</li>
</ul>

<p>
In development mode:
</p>

<ul>
  <li>Test accounts are generated via Friendbot</li>
  <li>Transactions are signed locally</li>
  <li>Network submission returns transaction hash</li>
</ul>

---

<h3>4️⃣ Application Layer (Next.js)</h3>

<p>
The frontend is built using:
</p>

<ul>
  <li>Next.js 13+ (App Router)</li>
  <li>TypeScript</li>
  <li>Stellar SDK</li>
</ul>

<p>
Responsibilities:
</p>

<ul>
  <li>Create Stellar test accounts</li>
  <li>Sign and submit transactions</li>
  <li>Display transaction logs</li>
  <li>Provide a clean decentralized interaction layer</li>
</ul>

<p>
The frontend does not control logic — it only interacts with the blockchain layer.
</p>

---

<h2>🔄 Execution Flow</h2>

<ol>
  <li>User generates a wallet</li>
  <li>Smart contract logic defines transfer rules</li>
  <li>Transaction is signed with private key</li>
  <li>Transaction is submitted to Stellar</li>
  <li>Network validates and confirms</li>
  <li>Transaction hash is returned</li>
</ol>

---

<h2>📁 Core Structure</h2>

<pre>
kod-2026
│
├── contract
│   ├── src/lib.rs
│   └── Cargo.toml
│
├── app
│   ├── components
│   ├── page.tsx
│   └── globals.css
│
├── lib
│   └── stellar.ts
</pre>

---

<h2>⚠️ Common Development Issues</h2>

<h3>Incorrect Import Paths</h3>
<p>Ensure <code>stellar.ts</code> exists inside the <code>lib</code> directory.</p>

<h3>Unused Error Variable</h3>
<p>Use <code>catch { }</code> instead of <code>catch(error)</code> in strict TypeScript mode.</p>

<h3>Contract Build Errors</h3>
<p>Verify Rust toolchain and WASM target are installed correctly:</p>

<pre>
rustup target add wasm32-unknown-unknown
cargo build --target wasm32-unknown-unknown
</pre>

---

<h2>🚀 Why This Project Matters</h2>

<p>
KOD 2026 is not just a frontend demo.
</p>

<p>
It represents:
</p>

<ul>
  <li>Decentralized funding infrastructure</li>
  <li>Trustless scholarship automation</li>
  <li>Programmable financial education tools</li>
  <li>Blockchain-native student empowerment</li>
</ul>

<p>
It challenges centralized financial gatekeeping through code.
</p>

---

<h2>🔮 Future Expansion</h2>

<ul>
  <li>On-chain scholarship eligibility verification</li>
  <li>DAO-based funding governance</li>
  <li>Multi-recipient contract logic</li>
  <li>AI-integrated scoring mechanism</li>
</ul>

---

<p align="center">
Code is freedom.<br/>
Education is power.<br/>
Blockchain removes permission.
</p>