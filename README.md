# 🚀 OctoSpark

<div align="center">
  <img src="public/OctoSpark_Final.png" alt="OctoSpark Logo" width="120" height="120">
  
  **Reveal the Spark in Every Developer**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![NextAuth.js](https://img.shields.io/badge/NextAuth.js-4-purple?style=flat-square&logo=next.js)](https://next-auth.js.org/)
  
  [Live Demo](https://octospark.vercel.app) • [Report Bug](https://github.com/zenoshubh/octospark/issues) • [Request Feature](https://github.com/zenoshubh/octospark/issues)
</div>

---

## 📖 About

OctoSpark is a comprehensive GitHub developer analytics platform that evaluates and scores developer profiles based on their contributions, repository quality, community engagement, and technical diversity. Perfect for recruiters, developers, and tech teams looking to assess coding talent and developer impact.

### ✨ Key Features

- **🔍 Real-time Analysis** - Instant insights into any GitHub developer's activity
- **📊 Comprehensive Metrics** - 6-category scoring system (100 points total)
- **🎯 Smart Scoring** - Proprietary algorithm evaluating developer impact
- **🔐 Secure Authentication** - GitHub OAuth integration
- **📱 Responsive Design** - Beautiful UI that works on all devices
- **⚡ Fast Performance** - Built with Next.js 15 and optimized for speed

## 🎯 Scoring Methodology

OctoSpark evaluates developers across **6 key dimensions**:

### 1. Open Source Contributions (25 points)
- External merged pull requests (0.5 pts each)
- Unique repositories contributed to (1 pt each)
- Total PR contributions (0.1 pts each)
- Annual contribution activity (0.1 pts each, max 5)

### 2. Repository Quality (20 points)
- Stars received (0.1 pts each, max 8)
- Forks received (0.2 pts each, max 4)
- Public repositories (0.5 pts each, max 4)
- Recently active repos (0.8 pts each, max 4)

### 3. Project Presentation (20 points)
- Detailed descriptions (max 5 pts)
- README files (max 5 pts)
- Live demo links (max 10 pts)
- Based on percentage of total repositories

### 4. Community Engagement (15 points)
- GitHub followers (0.2 pts each, max 3)
- Issue contributions (0.4 pts each, max 9)
- Public gists (0.5 pts each, max 3)

### 5. Technical Diversity (10 points)
- Programming languages used (2.5 pts each, max 10)
- Encourages polyglot development

### 6. Profile Completeness (10 points)
- Full name (2 pts)
- Bio/description (2 pts)
- Location (2 pts)
- Website/portfolio (2 pts)
- Profile README (2 pts)

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

### Backend
- **API**: Next.js API Routes
- **Authentication**: NextAuth.js with GitHub Provider
- **Data Source**: GitHub GraphQL API
- **HTTP Client**: Axios

### Deployment
- **Hosting**: Vercel
- **Domain**: Custom domain support
- **Analytics**: Built-in Vercel Analytics

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- GitHub account for OAuth setup

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/zenoshubh/octospark.git
cd octospark
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Environment Setup**

Create a `.env` file in the root directory:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key

# GitHub OAuth App
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

4. **GitHub OAuth App Setup**

- Go to [GitHub Developer Settings](https://github.com/settings/developers)
- Click "New OAuth App"
- Fill in the details:
  - **Application name**: OctoSpark Local
  - **Homepage URL**: `http://localhost:3000`
  - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
- Copy the Client ID and Client Secret to your `.env`

5. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)


## 🔧 Configuration

### GitHub Scopes Required
The application requires these GitHub OAuth scopes:
- `read:user` - Read user profile information
- `public_repo` - Access public repositories
- `user:email` - Read user email addresses

### API Limitations
- GitHub GraphQL API rate limits apply (5,000 points/hour for authenticated requests)
- Only public repositories and contributions are analyzed
- Private repository metrics are not included due to API limitations

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run test` (if applicable)
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Write clear commit messages
- Update documentation if needed
- Test your changes thoroughly

## 📊 Performance & Analytics

### Built-in Optimizations
- **Next.js Image Optimization** - Automatic image optimization
- **Font Optimization** - Self-hosted fonts with `next/font`
- **Bundle Analysis** - Webpack bundle analyzer integration
- **SEO Optimized** - Meta tags and Open Graph support

### Monitoring
- Vercel Analytics for performance monitoring
- Error boundary for graceful error handling
- Loading states for better UX

## 🔒 Security

- **OAuth 2.0** - Secure GitHub authentication
- **CSRF Protection** - Built-in NextAuth.js protection
- **Environment Variables** - Sensitive data properly configured
- **Rate Limiting** - GitHub API rate limit handling

## 👤 Author

**Shubh Verma**
- GitHub: [@zenoshubh](https://github.com/zenoshubh)
- Twitter: [@zenoshubh](https://twitter.com/zenoshubh)
- LinkedIn: [zenoshubh](https://linkedin.com/in/zenoshubh)
- Email: [zenoshubh@gmail.com](mailto:zenoshubh@gmail.com)

## 🙏 Acknowledgments

- [GitHub GraphQL API](https://docs.github.com/en/graphql) for comprehensive developer data
- [Vercel](https://vercel.com) for hosting and deployment
- [Next.js](https://nextjs.org) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Radix UI](https://radix-ui.com) for accessible UI primitives

## ☕ Support

If you found this project helpful, consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- ☕ [Buying me a coffee](https://buymeacoffee.com/zenoshubh)

---

<div align="center">
  Made with ❤️ for the developer community
  <br />
  <strong>Reveal the Spark in Every Developer</strong>
</div>
