# Makerr - Software & Business Solutions 🚀

A comprehensive full-stack web application providing professional software and business solutions including app development, web development, design services, marketing, and creator support services.

## 🌟 Overview

Makerr is a modern, responsive web platform that showcases and provides various digital services. The application features a React.js frontend with 3D animations, a Node.js/Express backend with MongoDB integration, and is deployed on Vercel with a robust CI/CD pipeline.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │◄──►│  Express API    │◄──►│    MongoDB      │
│   (Port 3000)   │    │   (Port 5000)   │    │   Database      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                        │                        │
        │                        │                        │
        ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vercel CDN    │    │  Vercel Lambda  │    │  MongoDB Atlas  │
│   (Frontend)    │    │   (Backend)     │    │   (Cloud DB)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern UI library with hooks and context
- **React Router DOM 7.6.3** - Client-side routing and navigation
- **Three.js 0.179.1** - 3D graphics and animations
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for Three.js
- **Framer Motion 12.23.0** - Advanced animations and transitions
- **GSAP 3.13.0** - High-performance animations
- **Vanta.js 0.5.24** - Animated 3D backgrounds
- **Material-UI 7.2.0** - React component library
- **Axios 1.10.0** - HTTP client for API requests
- **Lenis 1.3.11** - Smooth scrolling library

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 5.1.0** - Web application framework
- **MongoDB 8.16.1** - NoSQL database with Mongoose ODM
- **Nodemailer 7.0.4** - Email sending service
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 17.0.1** - Environment configuration

### Development Tools
- **Nodemon 3.1.10** - Development server auto-restart
- **Concurrently 9.2.0** - Run multiple commands simultaneously
- **React Scripts 5.0.1** - Create React App build tools

### Deployment & Hosting
- **Vercel** - Serverless deployment platform
- **MongoDB Atlas** - Cloud database hosting
- **Vercel Functions** - Serverless backend API

## 📁 Project Structure

```
Makerr/
├── 📁 client/                    # React Frontend Application
│   ├── 📁 public/               # Static assets and HTML template
│   │   ├── index.html          # Main HTML template with SEO meta tags
│   │   ├── favicon.ico         # Website favicon
│   │   ├── manifest.json       # PWA manifest
│   │   └── 📁 images/          # Static images and 3D models
│   │       └── 📁 services/    # Service icons and 3D models (.glb files)
│   ├── 📁 src/                 # Source code
│   │   ├── App.js              # Main app component with routing
│   │   ├── index.js            # React app entry point
│   │   ├── 📁 components/      # Reusable UI components
│   │   │   ├── Header.js       # Navigation header with cart
│   │   │   ├── Footer.js       # Website footer
│   │   │   ├── Cart.js         # Shopping cart for services
│   │   │   ├── QuoteModal.js   # Quote request modal
│   │   │   ├── LaptopModel3D.js # 3D laptop model component
│   │   │   ├── OfficeDesk3D.js # 3D office desk component
│   │   │   ├── ServiceCarousel3D.js # 3D service showcase
│   │   │   ├── ModernHeroBackground.js # Animated background
│   │   │   └── TechMarquee.js  # Scrolling tech stack display
│   │   ├── 📁 pages/           # Page components
│   │   │   ├── Home.js         # Landing page with hero section
│   │   │   ├── Services.js     # Services catalog with filtering
│   │   │   ├── About.js        # Company information
│   │   │   ├── Contact.js      # Contact form and information
│   │   │   ├── Careers.js      # Job opportunities
│   │   │   ├── PrivacyPolicy.js # Privacy policy
│   │   │   └── TermsOfService.js # Terms and conditions
│   │   ├── 📁 context/         # React Context providers
│   │   │   └── CartContext.js  # Shopping cart state management
│   │   └── 📁 css files        # Component-specific stylesheets
│   ├── 📁 build/               # Production build output
│   └── package.json            # Frontend dependencies
├── 📁 backend/                  # Node.js Backend API
│   ├── server.js               # Express server entry point
│   ├── 📁 models/              # MongoDB data models
│   │   ├── Contact.js          # Contact form submissions schema
│   │   └── Service.js          # Services catalog schema
│   ├── 📁 routes/              # API route handlers
│   │   ├── contact.js          # Contact form endpoints
│   │   └── services.js         # Services CRUD endpoints
│   └── package.json            # Backend dependencies
├── vercel.json                 # Vercel deployment configuration
└── README.md                   # Project documentation
```

## 🎯 Services Offered

### 🎨 Design Services
1. **Logo Design** - Custom brand identity and logo creation
2. **Poster Design** - Marketing materials and promotional graphics
3. **Thumbnail Design** - YouTube and social media thumbnails
4. **Video Editing** - Professional video production and editing
5. **UI/UX Design** - User interface and experience design
6. **Brand Identity** - Complete branding packages

### 💻 Development Services
7. **Web Development** - Modern websites and web applications
8. **Mobile App Development** - iOS and Android applications
9. **AI Assistants** - Custom chatbots and AI solutions
10. **Software Development** - Custom business software
11. **E-commerce Solutions** - Online stores and payment systems
12. **API Development** - RESTful APIs and integrations

### 🎬 Creator Services
13. **Script Writing** - Content scripts for videos and podcasts
14. **Sponsor Finding** - Brand partnership opportunities
15. **Content Strategy** - Strategic content planning
16. **Thumbnail & Graphics** - Creator-focused design services
17. **Video Editing** - Specialized editing for creators
18. **Influencer Marketing** - Marketing campaign management
19. **Channel/Profile Optimization** - Social media optimization
20. **Audience Analytics** - Performance and audience insights

### 📈 Marketing Services
21. **Digital Marketing Strategy** - Comprehensive marketing plans
22. **Social Media Marketing** - Social platform management
23. **Search Engine Optimization** - SEO and search visibility
24. **Content Marketing** - Strategic content creation
25. **Email Marketing** - Email campaign management
26. **Pay-Per-Click Advertising** - PPC campaign management

## 🚀 Features

### Frontend Features
- 🎨 **Modern UI/UX** - Clean, professional design with animations
- 🌐 **Responsive Design** - Mobile-first, cross-device compatibility
- 🎭 **3D Animations** - Interactive 3D models and backgrounds
- 🛒 **Shopping Cart** - Service selection and quote requests
- 🔍 **Service Filtering** - Category-based service browsing
- 📱 **Progressive Web App** - PWA capabilities with manifest
- ⚡ **Performance Optimized** - Code splitting and lazy loading
- 🎯 **SEO Optimized** - Meta tags, structured data, and sitemap

### Backend Features
- 🔐 **RESTful API** - Well-structured API endpoints
- 💾 **Database Integration** - MongoDB with Mongoose ODM
- 📧 **Email Integration** - Contact form email notifications
- 🌐 **CORS Enabled** - Cross-origin resource sharing
- 🔄 **Graceful Fallbacks** - Works without database connection
- 📊 **Request Logging** - Comprehensive API logging
- 🛡️ **Input Validation** - Server-side data validation

### DevOps Features
- 🚀 **Vercel Deployment** - Serverless hosting with CDN
- 🔄 **CI/CD Pipeline** - Automated build and deployment
- 🌍 **Environment Management** - Separate dev/prod environments
- 📈 **Performance Monitoring** - Built-in analytics and monitoring

## 📱 Pages & Functionality

### Public Pages
- **Home** - Hero section with 3D animations and service overview
- **Services** - Comprehensive service catalog with filtering and cart
- **About** - Company information and team details
- **Contact** - Contact form with service selection and quote requests
- **Careers** - Job opportunities and application process
- **Privacy Policy** - Data protection and privacy information
- **Terms of Service** - Legal terms and conditions

### Key Components
- **Header** - Navigation with cart indicator and mobile menu
- **Footer** - Links, contact information, and social media
- **3D Models** - Interactive laptop and office desk models
- **Service Cards** - Detailed service information with add-to-cart
- **Quote Modal** - Multi-step quote request process
- **Cart System** - Service selection and batch quote requests

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB (local or MongoDB Atlas)
- Git

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/Harshit057/Makerr.git
cd Makerr
```

2. **Install backend dependencies**
```bash
npm install
```

3. **Install frontend dependencies**
```bash
cd client
npm install
cd ..
```

4. **Environment Configuration**
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/makerr
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NODE_ENV=development
PORT=5000
```

5. **Start development servers**
```bash
# Start both frontend and backend
npm run dev-full

# Or start them separately
npm run server    # Backend on port 5000
npm run client    # Frontend on port 3000
```

6. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

### Production Build

1. **Build the frontend**
```bash
npm run build
```

2. **Start production server**
```bash
npm start
```

## 🌐 Deployment

### Vercel Deployment

The application is configured for deployment on Vercel with the following setup:

1. **Automatic Deployment**
   - Connected to GitHub repository
   - Automatic deployments on push to main branch
   - Preview deployments for pull requests

2. **Environment Variables**
   Set these in your Vercel dashboard:
   ```
   MONGODB_URI=your-mongodb-atlas-connection-string
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   NODE_ENV=production
   ```

3. **Custom Domain**
   - Configure custom domain in Vercel dashboard
   - SSL certificate automatically provided

### Manual Deployment Steps

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy to Vercel**
```bash
vercel --prod
```

3. **Set Environment Variables**
```bash
vercel env add
```

## 📊 API Endpoints

### Contact Endpoints
- `POST /api/contact` - Submit contact form
  - Body: `{ name, email, phone, company, service, message, isQuoteRequest, requestedServices }`
  - Response: Contact confirmation and email notification

### Services Endpoints
- `GET /api/services` - Retrieve all services
  - Query: `?category=development|design|marketing|creator`
  - Response: Filtered services array with features and details

## 🔒 Security Features

- **CORS Configuration** - Restricted cross-origin requests
- **Input Validation** - Server-side data validation
- **Environment Variables** - Sensitive data protection
- **Rate Limiting** - API abuse prevention (via Vercel)
- **HTTPS Enforcement** - SSL/TLS encryption
- **Sanitized Database Queries** - MongoDB injection prevention

## 🎨 Design System

### Color Palette
- Primary: Modern blues and teals for trust and technology
- Secondary: Vibrant accents for calls-to-action
- Neutral: Grays for text and backgrounds
- Success: Green for positive actions
- Warning: Orange for attention items

### Typography
- **Primary Font**: Inter - Clean, modern sans-serif
- **Secondary Font**: Poppins - Friendly, approachable headers
- **Icons**: Material Icons, Font Awesome, Bootstrap Icons

### 3D Elements
- **Laptop Model**: Interactive 3D laptop for tech services
- **Office Desk**: Professional workspace visualization
- **Animated Backgrounds**: Vanta.js particle systems

## 🧪 Testing

### Frontend Testing
```bash
cd client
npm test
```

### Backend Testing
```bash
npm test
```

### E2E Testing
- Manual testing workflow
- Cross-browser compatibility testing
- Mobile responsiveness testing

## 📈 Performance Optimization

### Frontend Optimizations
- **Code Splitting** - React lazy loading for routes
- **Image Optimization** - WebP format and responsive images
- **Bundle Analysis** - Webpack bundle analyzer integration
- **Caching Strategy** - Service worker implementation
- **3D Model Optimization** - Compressed GLB files

### Backend Optimizations
- **Database Indexing** - MongoDB performance indexes
- **Response Compression** - Gzip compression middleware
- **Caching Headers** - Browser caching for static assets
- **Connection Pooling** - MongoDB connection optimization

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   ```bash
   # Check MongoDB is running
   mongod --version
   
   # Verify connection string
   echo $MONGODB_URI
   ```

2. **Build Errors**
   ```bash
   # Clear node modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **3D Models Not Loading**
   - Check GLB file paths in public/images/services/
   - Verify Three.js dependencies are installed
   - Check browser WebGL support

4. **Email Sending Issues**
   - Verify Gmail app password setup
   - Check EMAIL_USER and EMAIL_PASS environment variables
   - Enable "Less secure app access" if using regular password

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices and hooks patterns
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Update documentation for new features
- Test thoroughly before submitting PRs

## 📄 License

This project is licensed under the ISC License - see the package.json file for details.

## 📞 Contact & Support

- **Email**: info.makerr@gmail.com
- **Phone**: +91 8957688223
- **Website**: https://makerr.com
- **GitHub**: https://github.com/Harshit057/Makerr

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Three.js Community** - For powerful 3D graphics capabilities
- **Vercel Team** - For excellent hosting and deployment platform
- **MongoDB** - For reliable database solutions
- **Open Source Community** - For all the amazing packages used

---

**Built with ❤️ by the Makerr Team**

*Transforming ideas into digital reality through innovative software and business solutions.*