# ReServe - Surplus Food Sharing Platform

\
*A platform to connect donors, NGOs, and delivery personnel for efficient surplus food distribution.*

## 📌 About ReServe

ReServe is a web application designed to reduce food wastage by connecting individuals and businesses with surplus food to NGOs that distribute it to those in need. The platform streamlines the process by enabling seamless donor-to-NGO connections, tracking deliveries, and collecting feedback to improve operations.

## 🚀 Features

- 📦 **Food Donation Management** - Donors can list surplus food for collection.
- 🏢 **NGO Collaboration** - NGOs can view and claim food donations.
- 🚚 **Delivery Tracking** - Assign delivery personnel and track food distribution in real time.
- ⭐ **Feedback & Ratings** - Gather ratings and feedback for service improvement.
- 📊 **Dashboard & Analytics** - Monitor donations, deliveries, and impact statistics.

## 🛠️ Tech Stack

- **Frontend**: React.js, Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js, Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Cloudinary (for images if applicable)
- **Deployment**: Vercel (Frontend), Railway/Supabase (Backend & Database)

## 📂 Project Structure

```
ReServe/
├── frontend/ (React + Next.js frontend)
├── backend/ (Express.js backend)
├── database/ (Supabase PostgreSQL setup)
└── README.md (This file)
```

## 🏗️ Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/yourusername/ReServe.git
cd ReServe
```

### 2️⃣ Install Dependencies

```sh
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in both `frontend/` and `backend/` directories with the required credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4️⃣ Run the Application

```sh
# Start Backend
cd backend
npm start

# Start Frontend
cd frontend
npm run dev
```

## 📌 API Endpoints

| Method | Endpoint          | Description                |
| ------ | ----------------- | -------------------------- |
| GET    | `/api/orders`     | Fetch all orders           |
| POST   | `/api/donate`     | Create a new food donation |
| PATCH  | `/api/orders/:id` | Update delivery status     |

## 🤝 Contributing

We welcome contributions! Feel free to open an issue or submit a pull request.

## 📜 License

This project is licensed under the [MIT License](LICENSE).

## ✨ Acknowledgments

- Open-source libraries & frameworks
- NGOs & donors supporting the cause

## 📬 Contact

For queries or collaborations, reach out via [your-email@example.com](mailto\:your-email@example.com) or visit our [GitHub Repository](https://github.com/yourusername/ReServe).

