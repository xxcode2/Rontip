# Rontip

A platform for tipping creators, developers, and artists using RON tokens on the Ronin blockchain.

## Features

- 🔌 **Ronin Wallet Integration** - Connect your Ronin Wallet to send and receive tips
- 👤 **Creator Profiles** - Create your profile and share your unique link
- 💸 **Instant Tips** - Send RON tokens directly to creators with no middleman
- 🎨 **Modern UI** - Beautiful, responsive design built with Next.js and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Wallet**: Ronin Wallet / Ethers.js
- **Icons**: Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
rontip/
├── app/
│   ├── page.tsx              # Home page
│   ├── explore/page.tsx      # Explore creators
│   ├── profile/[username]/   # Profile page
│   ├── how-it-works/         # How it works
│   └── create-profile/       # Create profile
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   └── Footer.tsx
├── hooks/
│   └── useWallet.ts          # Wallet connection hook
└── lib/
    ├── data.ts               # Mock data
    └── utils.ts              # Utilities
```

## Connect with Ronin

- [Ronin Official Site](https://roninchain.com)
- [Ronin Documentation](https://docs.skymavis.com)
- [Ronin Developer Console](https://developers.roninchain.com)

## License

MIT