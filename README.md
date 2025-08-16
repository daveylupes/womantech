# WomanTech Connect: Bridging the Gender Gap in SA Tech Through Verifiable Mentorship

> **A decentralized mentorship platform empowering women in South African tech through blockchain-verified professional relationships**

## 💡 The Vision

WomanTech Connect is a pioneering decentralized application (dApp) designed to address the critical gender disparity in the South African technology sector. Our vision is to create a transparent, meritocratic, and verifiable professional network that empowers women through structured mentorship, fostering career growth and leadership.

## 🌍 The Problem

Women are significantly underrepresented in SA STEM roles (23%) and face a substantial gender pay gap (25% less). A key systemic barrier is the lack of equitable access to effective, unbiased mentorship, which is proven to increase promotion rates by 5x and overall success by up to 64%. Existing platforms often rely on opaque, subjective processes, perpetuating bias.

## ✨ The Solution: Verifiable Mentorship

WomanTech Connect introduces a novel approach using blockchain technology to:

- **Combat Bias**: Mentorship matching based purely on objective, verified professional skills and experience, not personal attributes
- **Build Trust**: Cryptographically secure, immutable records of mentorship achievements and professional milestones
- **Foster Reputation**: A quantifiable, on-chain reputation system for mentors, incentivizing high-quality contributions

## 🎯 Target Audience

- **Aspiring & Junior Women in Tech**: Seeking guidance and career acceleration
- **Experienced Women in Tech**: Ready to mentor and contribute to the community
- **Tech Companies & Educational Institutions**: Seeking to support diversity and verify skills

## 🚀 Key Features (MVP)

For the hackathon, our MVP demonstrates the core value:

- **User Registration**: Simple onboarding as a 'mentor' or 'mentee'
- **On-Chain Mentorship Confirmation**: Mentors can cryptographically confirm completed sessions
- **Verifiable Mentor Reputation**: Mentor profiles display an immutable count of confirmed mentorships
- **Basic User Discovery**: View registered members and their roles
- **Diverse Community**: Showcase of diverse mentors and mentees from various backgrounds

## 🔒 Technology Stack

### Frontend
- **React.js** with TypeScript for type safety
- **Tailwind CSS** for responsive, modern UI design
- **Wagmi** for Ethereum wallet integration
- **Vite** for fast development and building
- **Framer Motion** for smooth animations

### Backend
- **FastAPI** (Python) for RESTful API services
- **SQLAlchemy** for database ORM
- **SQLite** for development database
- **Pydantic** for data validation and serialization
- **Uvicorn** for ASGI server

### Smart Contracts
- **Solidity** for EVM-compatible smart contracts
- **Foundry** for development, testing, and deployment
- **BlockDAG** network support (Chain ID: 1043)

### Development Tools
- **Python venv** for isolated Python environment
- **npm** for frontend package management
- **Git** for version control

## 🏗️ Project Architecture

```
womantech/
├── frontend/                 # React.js frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility libraries
│   │   └── assets/         # Static assets
│   └── package.json
├── backend_python/          # FastAPI backend
│   ├── app/
│   │   ├── api/            # API route handlers
│   │   ├── models/         # SQLAlchemy database models
│   │   ├── schemas/        # Pydantic data schemas
│   │   └── core/           # Core configuration
│   ├── scripts/            # Database seeding scripts
│   └── requirements.txt
├── contract/               # Solidity smart contracts
│   ├── src/               # Contract source files
│   ├── test/              # Contract tests
│   └── foundry.toml
└── demo.sh                # One-click demo script
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **Git**
- **MetaMask** or compatible Web3 wallet
- **Foundry** (for smart contract development)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd womantech
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend_python

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the backend server
python main.py
```

The backend will be available at `http://localhost:8000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 4. One-Click Demo

For the easiest setup, use our demo script:

```bash
# Make the script executable
chmod +x demo.sh

# Run the demo
./demo.sh
```

This will start both backend and frontend services automatically.

## 📱 Demo Walkthrough

### 1. Connect Your Wallet
- Open the application at `http://localhost:5173`
- Click "Connect Wallet" and approve the connection in MetaMask

### 2. Register as a User
- Click "Register" to create your profile
- Choose your role: **Mentor** or **Mentee**
- Fill in your details: name, email, bio, skills, experience
- Submit your registration

### 3. Explore the Community
- Navigate to the "Community" page
- Browse the diverse community of mentors and mentees:
  - **Mentors**: Precious Malope, Rachel Konuto, Jeremy Powell, Donald Trump, Aisha Patel, Marcus Johnson
  - **Mentees**: Zara Ahmed, Sofia Rodriguez, Kai Chen, Fatima Al-Zahra, Liam O'Connor, Yuki Tanaka
- Use search and filters to find specific users or skills

### 4. View Your Dashboard
- See your profile information
- Check your reputation score
- View your mentorship history

## 🔧 API Documentation

### User Endpoints

- `GET /api/users/search` - Get all users with pagination
- `GET /api/users/{wallet_address}` - Get specific user by wallet address
- `POST /api/users/register` - Register a new user

### Session Endpoints

- `GET /api/sessions` - Get all mentorship sessions
- `POST /api/sessions` - Create a new session
- `PUT /api/sessions/{id}/confirm` - Confirm a session
- `PUT /api/sessions/{id}/complete` - Complete a session

### Payment Endpoints

- `GET /api/payments/user/history` - Get user payment history
- `GET /api/payments/admin/revenue` - Get admin revenue data

## 🧪 Testing

### Backend Tests

```bash
cd backend_python
source venv/bin/activate
python -m pytest
```

### Frontend Tests

```bash
cd frontend
npm test
```

### Smart Contract Tests

```bash
cd contract
forge test -vvv
```

## 🌐 Deployment

### Backend Deployment

The FastAPI backend can be deployed to any cloud platform supporting Python:

```bash
# Example for Heroku
heroku create womantech-backend
git push heroku main

# Example for Railway
railway up
```

### Frontend Deployment

The React frontend can be deployed to Vercel, Netlify, or similar:

```bash
# Build for production
cd frontend
npm run build

# Deploy to Vercel
vercel --prod
```

### Smart Contract Deployment

Deploy to BlockDAG testnet:

```bash
cd contract
forge script script/Deploy.s.sol:Deploy --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast
```

## 🔒 Security Features

- **Input Validation**: All API endpoints validate input data
- **CORS Protection**: Configured for secure cross-origin requests
- **SQL Injection Prevention**: Using SQLAlchemy ORM
- **XSS Protection**: React's built-in XSS protection
- **Wallet Security**: MetaMask integration for secure wallet connections

## 🌱 Future Enhancements

### Phase 2 Features
- **Advanced Matching Algorithm**: AI-powered mentor-mentee matching
- **Video Integration**: Built-in video calling for sessions
- **Payment Processing**: Stripe integration for session payments
- **Mobile App**: React Native mobile application
- **Analytics Dashboard**: Detailed insights and metrics

### Phase 3 Features
- **DAO Governance**: Community-driven platform decisions
- **Token Economics**: Platform token for incentives
- **Cross-Chain Integration**: Multi-chain reputation portability
- **Enterprise Features**: Corporate mentorship programs

## 🤝 Contributing

We welcome contributions from the community! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for new functionality
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **BlockDAG Network** for blockchain infrastructure
- **FastAPI** team for the excellent web framework
- **React** team for the frontend framework
- **Tailwind CSS** for the utility-first CSS framework
- **Foundry** team for the smart contract development tools

## 📞 Contact

- **Project Link**: [https://github.com/your-username/womantech](https://github.com/your-username/womantech)
- **Issues**: [https://github.com/your-username/womantech/issues](https://github.com/your-username/womantech/issues)

## 🎯 Impact Metrics

By creating a trusted, equitable, and verifiable mentorship ecosystem, WomanTech Connect will:

- **Accelerate Career Growth**: Provide structured pathways for women in tech
- **Increase Representation**: Contribute to closing the gender gap in the SA tech industry
- **Build a Stronger Community**: Empower women to support and uplift each other
- **Set a New Standard**: Pioneer a model for truly meritocratic professional networking

---

**Made with ❤️ for the South African tech community**

