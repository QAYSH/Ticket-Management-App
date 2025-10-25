# TicketFlow - Modern Ticket Management System

A beautiful, responsive React web application for managing tickets with full CRUD functionality, authentication simulation, and protected routes.

## 🚀 Features

- **Landing Page**: Eye-catching hero section with wavy background, decorative elements, and feature cards
- **Authentication**: Complete login/signup flow with client-side validation using localStorage
- **Dashboard**: Overview with ticket statistics (Total, Open, In Progress, Closed)
- **Ticket Management**: Full CRUD operations with status tracking, form validation, and toast notifications
- **Protected Routes**: Secure access to dashboard and ticket pages
- **Responsive Design**: Mobile-first approach with layouts that adapt from stacked to grid
- **Accessibility**: Semantic HTML, ARIA labels, focus states, and proper color contrast

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router DOM** - Client-side routing
- **Context API** - Global state management
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Beautiful component library
- **React Hook Form** - Form validation
- **Sonner** - Toast notifications
- **Vite** - Lightning-fast build tool
- **date-fns** - Date formatting

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd ticketflow

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

## 🏗️ Project Structure

```
src/
├── assets/              # Images and SVG assets
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn UI components
│   ├── Footer.tsx      # Consistent footer
│   ├── ProtectedRoute.tsx
│   ├── StatCard.tsx
│   ├── TicketCard.tsx
│   └── TicketForm.tsx
├── context/            # State management
│   ├── AuthContext.tsx # Authentication state
│   └── TicketContext.tsx # Ticket data state
├── pages/              # Route pages
│   ├── Auth/
│   │   ├── Login.tsx
│   │   └── Signup.tsx
│   ├── Landing.tsx
│   ├── Dashboard.tsx
│   ├── Tickets.tsx
│   └── NotFound.tsx
├── App.tsx             # Main app component
└── main.tsx           # Entry point
```

## 🎨 Design System

### Colors
- **Primary**: Indigo (#6366F1) - Trust and professionalism
- **Status Colors**:
  - Open: Green (#16A34A)
  - In Progress: Amber (#F59E0B)
  - Closed: Slate (#64748B)

### Layout
- **Max Width**: 1440px (centered)
- **Responsive Breakpoints**:
  - Mobile: < 640px (stacked layout)
  - Tablet: 640px - 1024px (2-column grid)
  - Desktop: > 1024px (3-4 column grid)

### Typography
- Headings: Bold with tight tracking
- Body: Readable line-height with antialiasing

## 🔐 Authentication

The app uses **localStorage** to simulate authentication:

- **Session Key**: `ticketapp_session`
- **Users Key**: `ticketapp_users`

### Demo Credentials
```
Email: user@example.com
Password: password123
```

### How It Works
1. **Signup**: Creates user in localStorage and auto-logs in
2. **Login**: Validates credentials against stored users
3. **Session**: Stores user data in session storage
4. **Logout**: Clears session and redirects to landing
5. **Protected Routes**: Checks for valid session before rendering

## 📝 Ticket Management

### Ticket Schema
```typescript
{
  id: string
  title: string (required, max 200 chars)
  description: string (optional, max 1000 chars)
  status: 'open' | 'in_progress' | 'closed'
  createdAt: ISO date string
  updatedAt: ISO date string
}
```

### Operations
- **Create**: Form with validation for title and status
- **Read**: Filter by status (All, Open, In Progress, Closed)
- **Update**: Edit existing tickets with pre-filled form
- **Delete**: Confirmation dialog before removal

### Validation
- Title: Required, max 200 characters
- Status: Required, must be one of three valid values
- Description: Optional, max 1000 characters

### Storage
Tickets are persisted in **localStorage** under key `ticketapp_tickets`

## ✨ User Experience

### Toast Notifications
- Success: "Ticket created successfully"
- Error: "Invalid credentials. Please try again"
- Session: "Your session has expired — please log in again"
- Delete: "Ticket deleted successfully"

### Form Validation
- Real-time inline error messages
- Required field indicators (*)
- Character count for text areas
- Email format validation
- Password strength requirements (min 6 chars)

## ♿ Accessibility Features

- **Semantic HTML**: `<main>`, `<nav>`, `<section>`, `<header>`, `<footer>`
- **ARIA Labels**: All interactive elements labeled
- **Keyboard Navigation**: Full keyboard support with visible focus states
- **Color Contrast**: WCAG AA compliant text/background ratios
- **Alt Text**: Descriptive alt attributes for all images
- **Form Accessibility**: Proper label associations and error announcements

## 🧪 Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 🔧 Configuration

### Environment Variables
No environment variables required - fully client-side application

### Customization
- Edit `src/index.css` for design tokens
- Modify `tailwind.config.ts` for Tailwind customization
- Update `src/context/*` for state management logic

## 📋 Known Limitations

1. **Authentication**: Uses localStorage (not production-ready security)
2. **Data Persistence**: Client-side only - cleared on browser cache clear
3. **Multi-user**: No real backend - can't sync across devices
4. **File Uploads**: Not supported in current version
5. **Real-time Updates**: No WebSocket support

## 🚧 Future Enhancements

- Backend integration (Node.js/Express or Supabase)
- Real authentication with JWT tokens
- File attachment support for tickets
- User roles and permissions
- Email notifications
- Advanced filtering and search
- Ticket comments/activity log
- Dark mode toggle

## 🤝 Contributing

This is a demonstration project. Feel free to fork and customize for your needs.

## 📄 License

MIT License - feel free to use this project as a template for your own applications.

## 🙏 Credits

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Components from [Shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**Note**: This application is designed to be layout-identical for Vue and Twig implementations. The design system and component structure are intentionally framework-agnostic to ensure consistency across implementations.
