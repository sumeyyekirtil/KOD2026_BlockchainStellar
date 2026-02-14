# KOD2026: Code, Break the AI Chains 🚀

**Project Link:** [https://github.com/sumeyyekirtil/KOD2026_BlockchainStellar](https://github.com/sumeyyekirtil/KOD2026_BlockchainStellar)

A decentralized application (dApp) built for the **RiseIn KOD2026 Hackathon**. This project combines high-performance **Rust/Soroban** smart contracts with a modern **Next.js** frontend to demonstrate seamless decentralized interaction on the Stellar network.

---

## 📁 Project Structure

* **`gm_gn_counter/`**: The backend logic. A Soroban smart contract written in Rust that manages on-chain interactions.
* **`gm-frontend/`**: A responsive, user-friendly frontend built with Next.js 15, TypeScript, and Tailwind CSS.
* **`.gitignore`**: Configured to protect sensitive data like `.env` and ignore heavy folders like `node_modules` and `target`.

---

## 🛠 Tech Stack & AI Tools

### Core Technologies
* **Blockchain**: Stellar (Soroban Smart Contracts)
* **Smart Contract Language**: Rust
* **Frontend**: Next.js 15, TypeScript, Tailwind CSS
* **CLI Tools**: Soroban-CLI v25.1.0

### AI Tools Used
* **Gemini 2.0 Flash**: Used for architectural guidance, step-by-step debugging, and code optimization.
* **GitHub Copilot**: Assisted in real-time code completion and boilerplate generation.
* **v0.dev**: Utilized for rapid UI prototyping and component design.

> **💡 The Importance of AI Role Assignment**: During the development phase, assigning specific roles to the AI (e.g., *"Act as a Senior Stellar/Soroban Developer"*) was a key strategy. This ensured that the generated solutions were optimized for Soroban's specific resource limits and security patterns.

---

## 🚀 Deployment & Installation

### Smart Contract Deployment
The contract is successfully deployed on the **Stellar Testnet**.
* **Contract ID**: `CBGEPTDJZA6ZYWNXAYCEFGTQWFHTYLLSVZL5Q5L5XEOTASOYH204NG4F`
* **Network**: Testnet

### Frontend Setup
1. **Clone the repository**:
   ```bash
   git clone [https://github.com/sumeyyekirtil/KOD2026_BlockchainStellar.git](https://github.com/sumeyyekirtil/KOD2026_BlockchainStellar.git)

2->   Navigate to the frontend folder:
cd gm-frontend

---

3->    Install dependencies:
npm install  / npm.cmd install

---

4->    Run the development server:
npm run dev

---

⚠️ Troubleshooting & Solutions
"Some Errors" & Their Fixes
Issue: npm install command not recognized or failing in Windows PowerShell.

Solution: Use npm.cmd install. On some Windows configurations, calling the .cmd extension explicitly resolves path issues.

Issue: Environment variables not loading.

Solution: Ensure your .env or .env.local file is in the correct directory. Remember that .env is excluded from GitHub for security (check .gitignore).

Issue: Rust compilation errors for Wasm.

Solution: Run rustup target add wasm32-unknown-unknown to ensure the correct build target is installed.

---

📸 Proof of Build
Stellar Expert: View Transaction on Explorer
Stellar Lab: Successful deployment confirmed via Contract ID.