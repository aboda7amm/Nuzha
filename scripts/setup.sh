#!/bin/bash

echo "Setting up نُزُهَه application..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Generate Prisma client
echo "Generating Prisma client..."
npm run prisma:generate

# Run migrations
echo "Running database migrations..."
npm run prisma:migrate -- --name init

echo "✓ Setup complete!"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "The app will be available at http://localhost:3000"
