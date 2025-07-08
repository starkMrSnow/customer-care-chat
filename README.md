# 🗨️ Customer Chat Support System

A real-time customer support chat system that allows users to message an admin directly from your app or platform. Built with Spring Boot and Angular, this lightweight, modular solution can be embedded into KYC platforms, service portals, e-commerce sites, or any application that needs quick and direct customer communication.

---

## 🚀 Features

- 🔁 **Real-Time Messaging** – Built using WebSocket (STOMP over SockJS).
- 👥 **One-on-One Chat** – Customers can chat directly with a single admin.
- 💬 **Message History** – Messages are saved and retrievable from a PostgreSQL database.
- 🧩 **Modular Frontend** – Easily embeddable Angular components (`admin`, `customer`, `welcome`).
- 🔐 **Secure Communication** – WebSocket connection uses authenticated sessions.
- ⚙️ **Scalable Backend** – Cleanly structured Spring Boot backend with separation of concerns.

---


## 🧱 Tech Stack

### Backend
- **Java** + **Spring Boot**
- **STOMP over WebSocket**
- **PostgreSQL**
- **Maven**

### Frontend
- **Angular**
- **RxJS**
- **WebSocket Client**

---
    
🛠️ Setup Guide
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/starkMrSnow/customer-chat-support.git
cd customer-chat-support
2. Backend Setup (Spring Boot)
Create a PostgreSQL database (e.g., chatdb)

Update credentials in backend/src/main/resources/application.properties:

properties
Copy
Edit
spring.datasource.url=jdbc:postgresql://localhost:5432/chatdb
spring.datasource.username=postgres
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
Start the backend:

bash
Copy
Edit
cd backend
./mvnw spring-boot:run
3. Frontend Setup (Angular)
bash
Copy
Edit
cd frontend
npm install
ng serve
Then visit: http://localhost:4200



🙌 Usage
This system is free to use, modify, and embed in your own platforms:

   🧩 Drop-in ready Angular components

   🔌 Hook into your existing backend

   ✏️ Modify styles, routes, or data logic as needed

Fork it, extend it, or plug it directly into your project — no limitations.

💡 Example Use Cases

  👩‍💼 KYC & onboarding platforms that require real-time verification assistance

   🛒 E-commerce platforms with customer support

   🧾 Portals for resolving customer issues

   🏢 Internal admin-customer chat for enterprise tools


🛣️ Roadmap

 Multi-admin / customer thread support

 Authentication & session-based chat

 Message status indicators (sent, delivered, read)

 File uploads (images, attachments)

 Typing indicator and presence tracking

🤝 Contributing
All contributions are welcome! Just:

Fork the repo

Create a feature branch

Make your changes

Submit a pull request


📄 License

This project is licensed under the MIT License.

You're free to:

✅ Use in commercial or personal projects

✅ Modify and distribute

✅ Embed into larger systems

⚠️ Provided "as is", without warranty of any kind.

👨‍💻 Author
Stanley Otieno
Built with ❤️ to make customer support more human and seamles
