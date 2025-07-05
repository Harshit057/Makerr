# Makerr - Software & Business Solutions

A professional MERN stack website for Makerr, a software and business solutions provider offering comprehensive services including app development, web development, SEO & marketing, poster making, social media management, cyber security, and system solutions.

## 🚀 Features

- **Modern MERN Stack Architecture** (MongoDB, Express.js, React, Node.js)
- **Responsive Design** - Works perfectly on all devices
- **Professional Services Showcase** - Detailed service pages with filtering
- **Contact Form** with email notifications
- **About Page** with team and company information
- **SEO Optimized** for better search engine visibility
- **Fast Loading** with optimized assets and code splitting

## 🛠️ Services Offered

- **App Development** - iOS and Android mobile applications
- **Web Development** - Modern, responsive websites and web applications
- **SEO & Marketing** - Digital marketing and search engine optimization
- **Poster Making** - Professional graphic design services
- **Social Media Management** - Complete social media strategy and management
- **Cyber Security** - Security audits, monitoring, and consulting
- **System Solutions** - Custom software and system integrations

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd makerr
```

### 2. Install server dependencies
```bash
npm install
```

### 3. Install client dependencies
```bash
npm run client-install
```

### 4. Environment Configuration
Create a `.env` file in the root directory and add:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/makerr
JWT_SECRET=your_jwt_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:3000
```

### 5. Database Setup
Make sure MongoDB is running on your system. The application will automatically create the database and collections.

## 🚀 Running the Application

### Development Mode (Full Stack)
```bash
npm run dev-full
```
This runs both the server (port 5000) and client (port 3000) concurrently.

### Server Only
```bash
npm run dev
```

### Client Only
```bash
npm run client
```

### Production Build
```bash
npm run build
npm start
```

## 📁 Project Structure

```
makerr/
├── client/                 # React frontend
│   ├── public/            # Public assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Header.js
│   │   │   └── Footer.js
│   │   ├── pages/         # Page components
│   │   │   ├── Home.js
│   │   │   ├── Services.js
│   │   │   ├── About.js
│   │   │   └── Contact.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── models/                # MongoDB models
│   └── Contact.js
├── routes/                # API routes
│   ├── contact.js
│   └── services.js
├── server.js              # Express server
├── package.json
└── .env                   # Environment variables
```

## 🎨 Design Features

- **Modern UI/UX** with clean, professional design
- **Gradient Backgrounds** and smooth animations
- **Card-based Layout** for easy content consumption
- **Interactive Elements** with hover effects
- **Mobile-First** responsive design
- **Professional Color Scheme** (Blues, whites, accent colors)

## 📱 API Endpoints

### Contact Routes
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)

### Services Routes
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get specific service
- `GET /api/services?category=<category>` - Filter by category

## 🔒 Security Features

- **Input Validation** on all forms
- **CORS Protection** configured
- **MongoDB Injection** protection
- **Environment Variables** for sensitive data
- **Rate Limiting** (can be added)
- **Helmet.js** (can be added for additional security)

## 📧 Email Configuration

The contact form supports email notifications. To enable:

1. Use Gmail or another SMTP service
2. For Gmail, enable 2-factor authentication
3. Generate an App Password
4. Update EMAIL_USER and EMAIL_PASS in .env

## 🌐 Deployment

### Heroku Deployment
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Connect to MongoDB Atlas
4. Deploy using Git or GitHub integration

### Vercel/Netlify (Frontend) + Railway/Render (Backend)
1. Deploy backend to Railway/Render
2. Deploy frontend to Vercel/Netlify
3. Update API URLs in frontend

## 🔄 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run client` - Start React development server
- `npm run dev-full` - Start both server and client
- `npm run build` - Create production build
- `npm run client-install` - Install client dependencies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For support and inquiries:
- Email: info.makerr@gmail.com
- Phone: +91 8957688223

## 🚀 Future Enhancements

- User authentication and admin dashboard
- Blog/News section
- Portfolio/Case studies
- Client testimonials
- Live chat integration
- Payment gateway integration
- Multi-language support

---

**Makerr** - Transforming businesses through innovative software solutions.
