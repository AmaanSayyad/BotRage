# BOTRage 🔥

**Decentralized Compute Portal on BOT Chain**

BOTRage lets anyone turn idle hardware into a private cloud node and earn BOT on BOT Chain Mainnet. The protocol auto-detects your system capabilities, registers your node on-chain, and streams micro-rewards for compute contributions.

---

## 🌐 BOT Chain Network Parameters

| Parameter | Mainnet Value |
| :--- | :--- |
| **Network Name** | BOT Chain Mainnet |
| **Chain ID** | `677` (0x2a5) |
| **RPC Endpoint** | `https://rpc.botchain.ai` |
| **Block Explorer** | `https://scan.botchain.ai` |
| **Native Token** | `BOT` |
| **Block Time** | `~0.75s` |
| **Average Gas Fee** | `~$0.06` |
| **Ecosystem Links** | [Official DEX](https://dex.botchain.ai/) • [Bridge](https://bridge.botchain.ai/) • [Dev Docs](https://dev-docs.botchain.ai/) |

---

## ✨ Core Features

- **Zero-Setup Hardware Audit**: Auto-detects CPU concurrency, RAM thresholds, and WebGL GPU capabilities straight through the browser environment.
- **EVM Web3 Integration**: Seamless one-click wallet connection (MetaMask, Rabby, BO Wallet) with automatic detection and addition of BOT Chain Mainnet (Chain ID 677).
- **Smart Contract Node Registry**: On-chain registration and verification via `NodeRegistry.sol` on BOT Chain.
- **Micro-Yield Reward Streaming**: Real-time compute reward streaming and on-chain withdrawal via `RewardPool.sol`.
- **Live Telemetry & Diagnostics**: Real-time terminal streaming daemon stdout logs, CPU/Memory/VRAM gauges, and direct links to BOTScan.
- **Cyberpunk AI Glassmorphic UI**: High-fidelity dark mode interface with cyan and violet accents, floating gradient orbs, and smooth micro-animations.

---

## 🛠️ Architecture Stack

- **Framework**: Next.js 16 (App Router, React 19)
- **Styling**: Tailwind CSS v4 + Glassmorphism tokens
- **Animations**: Framer Motion
- **Web3 Layer**: ethers.js v6 (EIP-1193 provider)
- **Smart Contracts**: Solidity 0.8.24 + Foundry
- **Target Network**: BOT Chain Mainnet (Chain ID: 677)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Smart Contracts Layer

Smart contracts are located in `contracts/` and managed using [Foundry](https://book.getfoundry.sh/).

### Contracts Included:
1. `NodeRegistry.sol`: Registers and tracks active compute nodes with hardware specifications.
2. `RewardPool.sol`: Manages reward treasury and per-second reward streaming claims.

### Run Contract Verification & Tests:
```bash
# Verify compilation
node scripts/verify-contracts.js

# Or with Foundry
cd contracts
forge test -v
```

### Deploy to BOT Chain Mainnet:
```bash
cd contracts
cp .env.example .env
# Add your funded PRIVATE_KEY in .env
forge script script/Deploy.s.sol --rpc-url https://rpc.botchain.ai --broadcast --verify
```

### Contract Addresses (BOT Chain Mainnet)

| Contract | Address |
| :--- | :--- |
| **NodeRegistry** | [`0x80eeedf05955a93fa4f42c16805f40da0b15f6be`](https://scan.botchain.ai/address/0x80eeedf05955a93fa4f42c16805f40da0b15f6be) |
| **RewardPool** | [`0xcff046c4bcbab4f25254fd41d94f8acd7a3334fa`](https://scan.botchain.ai/address/0xcff046c4bcbab4f25254fd41d94f8acd7a3334fa) |

Addresses are set in `src/lib/constants.ts`.

---

## 🚀 Deploying to Vercel

1. Push your repository to GitHub:
```bash
git add .
git commit -m "feat: BOTRage - Decentralized Compute on BOT Chain"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/botrage.git
git push -u origin main
```
2. Import the repository into **Vercel**.
3. Framework Preset: **Next.js**.
4. Click **Deploy**.

---

## 📜 License
Distributed under the MIT License.
