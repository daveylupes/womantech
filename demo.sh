#!/bin/bash

echo "🚀 Starting WomanTech Connect MVP Demo..."

# Function to cleanup background processes
cleanup() {
    echo "🛑 Stopping all processes..."
    pkill -f "python.*main.py" 2>/dev/null
    pkill -f "vite" 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Check if backend is already running
if curl -s http://localhost:8000/health > /dev/null 2>&1; then
    echo "✅ Backend is already running on http://localhost:8000"
else
    echo "🔧 Starting FastAPI backend..."
    cd backend_python
    source venv/bin/activate
    python main.py &
    BACKEND_PID=$!
    cd ..
    
    # Wait for backend to start
    echo "⏳ Waiting for backend to start..."
    for i in {1..30}; do
        if curl -s http://localhost:8000/health > /dev/null 2>&1; then
            echo "✅ Backend started successfully on http://localhost:8000"
            break
        fi
        sleep 1
    done
fi

# Check if frontend is already running
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo "✅ Frontend is already running on http://localhost:5173"
else
    echo "🎨 Starting React frontend..."
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    cd ..
    
    # Wait for frontend to start
    echo "⏳ Waiting for frontend to start..."
    for i in {1..30}; do
        if curl -s http://localhost:5173 > /dev/null 2>&1; then
            echo "✅ Frontend started successfully on http://localhost:5173"
            break
        fi
        sleep 1
    done
fi

echo ""
echo "🎉 WomanTech Connect MVP is ready!"
echo ""
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend API: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "👥 Demo Users:"
echo "   - Mentors: Precious Malope, Rachel Konuto, Jeremy Powell, Donald Trump, Aisha Patel, Marcus Johnson"
echo "   - Mentees: Zara Ahmed, Sofia Rodriguez, Kai Chen, Fatima Al-Zahra, Liam O'Connor, Yuki Tanaka"
echo ""
echo "💡 Tips:"
echo "   - Connect your wallet to see your profile"
echo "   - Browse the Community page to see all users"
echo "   - Try searching and filtering by role/skills"
echo "   - Register as a new user to test the flow"
echo ""
echo "Press Ctrl+C to stop all services"

# Keep script running
wait
