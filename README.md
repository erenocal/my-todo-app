# ✨ Todo App - Built with shadcn/ui

A beautiful, modern todo application built with **React**, **Next.js**, and **shadcn/ui** components. Features a clean interface, smooth animations, and local storage persistence.

## 🚀 Features

- **Add Tasks**: Create new todo items with a clean input form
- **Mark Complete**: Toggle task completion with beautiful checkboxes
- **Delete Tasks**: Remove individual tasks with hover-reveal delete buttons
- **Clear Completed**: Bulk remove all completed tasks
- **Local Storage**: Tasks persist between browser sessions
- **Responsive Design**: Works perfectly on desktop and mobile
- **Smooth Animations**: Beautiful transitions and hover effects
- **Toast Notifications**: Elegant feedback for user actions
- **Accessibility**: Built with Radix UI primitives for excellent accessibility

## 🎨 Design Features

- **Modern UI**: Clean, minimalist design using shadcn/ui components
- **Beautiful Components**: Professional-grade UI components with consistent styling
- **Smooth Animations**: Fade-in effects and hover transformations
- **Responsive Layout**: Adapts to different screen sizes
- **Typography**: Inter font for optimal readability
- **Color System**: CSS variables for consistent theming

## 🛠️ Technical Stack

- **Framework**: Next.js 14 with App Router
- **UI Library**: shadcn/ui components
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React icons
- **State Management**: React hooks with localStorage
- **TypeScript**: Full type safety
- **Accessibility**: Radix UI primitives

## 📱 Usage

### Adding Tasks
1. Type your task in the input field
2. Press Enter or click the + button
3. Your task will appear at the top of the list

### Managing Tasks
- **Complete**: Click the checkbox to mark as done
- **Delete**: Hover over a task to reveal the delete button
- **Clear All Completed**: Use the "Clear completed" button

### Notifications
- Beautiful toast notifications for all user actions
- Automatic dismissal with smooth animations

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Open Browser**: Navigate to `http://localhost:3000`

4. **Start Adding Tasks** - no setup required!

## 📁 File Structure

```
ToDo/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page component
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   │   ├── button.tsx     # Button component
│   │   ├── input.tsx      # Input component
│   │   ├── checkbox.tsx   # Checkbox component
│   │   ├── card.tsx       # Card components
│   │   ├── toast.tsx      # Toast components
│   │   └── toaster.tsx    # Toaster component
│   └── TodoApp.tsx        # Main todo app component
├── hooks/                  # Custom React hooks
│   └── use-toast.ts       # Toast management hook
├── lib/                    # Utility functions
│   └── utils.ts           # Class name utilities
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
├── next.config.js          # Next.js configuration
└── README.md               # This documentation
```

## 🌟 Key Components

### shadcn/ui Components Used
- **Button**: Multiple variants (default, outline, ghost, destructive)
- **Input**: Clean text input with focus states
- **Checkbox**: Accessible checkbox with custom styling
- **Card**: Content containers with consistent spacing
- **Toast**: Elegant notification system

### Custom Features
- **TodoApp**: Main application logic with React hooks
- **useToast**: Custom hook for toast management
- **Local Storage**: Persistent data storage
- **Responsive Design**: Mobile-first approach

## 🔧 Customization

The app is designed to be easily customizable:

- **Colors**: Modify CSS variables in `app/globals.css`
- **Components**: Customize shadcn/ui components in `components/ui/`
- **Styling**: Adjust Tailwind classes throughout the app
- **Animations**: Modify keyframes in `tailwind.config.js`

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with ES6+ support

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
1. Push to GitHub
2. Connect to Vercel
3. Automatic deployments on push

## 📝 Future Enhancements

Potential features for future versions:
- Dark/light theme toggle
- Task categories/tags
- Due dates and reminders
- Priority levels
- Export/import functionality
- Cloud sync capabilities
- Drag and drop reordering

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using React, Next.js, and shadcn/ui**
