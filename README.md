# 📝 Real-Time Collaborative Text Editor with React & Firebase

Welcome to the **Real-Time Collaborative Text Editor**! This project is designed to provide a **Google Docs-like** experience, allowing multiple users to edit the same document **simultaneously** with **live updates**. 

## 🚀 Project Overview
This **React-based** text editor leverages **Firebase Firestore** for real-time synchronization, ensuring that changes made by one user instantly reflect on all connected clients. The UI is built with **React Quill**, offering a rich text editing experience.

## ✨ Features
- **🔄 Real-Time Collaboration** – Multiple users can edit the same document, and changes sync instantly.
- **🔥 Firebase Firestore Integration** – Uses Firestore's real-time database for efficient data syncing.
- **📄 Google Docs-Like UI** – A familiar and intuitive interface for seamless editing.
- **📡 Optimized Editing** – Detects idle periods to reduce unnecessary database writes.

## 🛠️ How It Works
- **Text Synchronization**: Firebase Firestore listens for document changes and updates all users in real-time.
- **Throttle Optimization**: Limits excessive database writes by saving changes at controlled intervals.

## 🏗️ Code Breakdown
- **`Editor.tsx`** – Main editor component with Firebase document synchronization and real-time cursor tracking.
- **`firebase-config.js`** – Firebase configuration for Firestore integration.
- **`styles.css`** – Custom styling to resemble Google Docs.


###  Run the Project
npm run dev

💡 **Made by ❤️ Ramit Roshan using React, Firebase & Quill**
