# Book Review Web App

## Overview
The **Book Review Web App** is a platform that allows users to share and discover book reviews. It enables readers to explore ratings, write their own reviews. The app combines powerful features with a clean, user-friendly interface for an enjoyable experience.

---

## Features

### Public Features
- **Search Books**: Find books by title or author using the search functionality.
- **View Reviews**: Browse reviews and ratings for different books.

### Authenticated Features
- **User Dashboard**: Access a personalized dashboard to manage reviews.
- **Write Reviews**: Share thoughts on books and rate them on a 5-star scale.
- **Edit & Delete Reviews**: Manage previously written reviews.
- **Filter Reviews**: Sort reviews by ratings or date published.

---

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **Tailwind CSS**: For responsive and modern styling.
- **Lucide Icons**: For beautiful, consistent icons.

### Backend
- **Node.js & Express**: For the server and API management.
- **MongoDB**: As the database for storing users, reviews, and books.

### Tools
- **Axios**: For handling API requests.
- **React Router**: For seamless navigation between pages.
- **Cookies**: For session management.

---

## API Endpoints
### User Endpoints
- `POST /signup` - Register a new user.
- `POST /signin` - Login with credentials.
- `GET /get-user/:id` - Fetch user data by ID.

### Review Endpoints
- `GET /get-reviews` - Retrieve all reviews.
- `GET /get-user-reviews` - Retrieve all user reviews.
- `POST /add-review` - Add a new review.
- `DELETE /delete-review/:id` - Delete a review.
- `PUT /update-review/:id` - Update an existing review.

---


## Contact
If you have any questions or issues, feel free to reach out:
- **Email**: anukasamuditha@gmail.com
- **GitHub**: [AnukaSamuditha](https://github.com/AnukaSamuditha)

Happy coding!
