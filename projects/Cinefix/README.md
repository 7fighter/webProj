# CineFix – React Favorites App with Dynamic Image Handling
A dynamic and responsive movie listing app built with React that showcases real-time random images using the picsum.photos API. It focuses on fixing real-world bugs caused by randomness in image rendering and state mismatch. The app leverages React Context API, prop comparison techniques, and Tailwind CSS to deliver a smooth and consistent user experience, even with unpredictable image sources.

### Resouces 
for the api i have used the `website` 
```html
https://www.loremipsums.org/placeholders/
```

---

---

### ⚙️ How It Works

* The app displays a list of movies, each with a random image based on `movie.id` from the `picsum.photos` API.
* Users can add a movie to their **Favorites**.
* To prevent mismatched images (since `picsum` is randomized), we:

  * Save the **exact `poster_path` URL** when a movie is added to favorites.
  * Use both `movie.id` and `poster_path` to match favorites.
* Global state (favorites) is handled using the **Context API**.
* Styling is done with **Tailwind CSS** for responsive design.

---

### 📦 Folder Structure

```js
src/
├── components/
│   ├── MovieCard.jsx          // Renders each movie card with image, title, and heart icon
│   └── FavoritesList.jsx      // (Optional) Renders list of favorite movies
│
├── context/
│   └── MovieContext.jsx       // Global state management for favorites using React Context
│
├── data/
│   └── movies.js              // Sample static movie data (IDs, titles, etc.)
│
├── App.jsx                    // Root component with layout and routes
├── main.jsx                   // Entry point for React (Vite-specific)
└── index.css                  // Tailwind CSS and global styles
```

---

### 🔑 Key Files Explained

| File               | Purpose                                                                   |
| ------------------ | ------------------------------------------------------------------------- |
| `MovieContext.jsx` | Holds the context provider, and functions to add/remove/check favorites.  |
| `MovieCard.jsx`    | Displays movie info and handles heart icon logic using context functions. |
| `movies.js`        | Static data source for movies (can be replaced with an API later).        |
| `App.jsx`          | Main app layout and page content.                                         |
| `index.css`        | Tailwind CSS setup and utility classes.                                   |

---

### 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```


---
---


# 🧾 Fixes and Updates – With Code and Explanations

---

## 🔴 **Issue 1: Images in Favorites Don’t Match Home**

### ✅ Problem:

When you add a movie to favorites, the image changes later — so Favorites shows a **different** image than what you clicked.

### 🧠 Why?

You were using dynamic random image links like:

```js
poster_path: `https://picsum.photos/300/200?random=${movie.id}`
```

These return a **new image every time**, even with the same ID.

---

### 🔧 ✅ Fix:

Instead of generating a new image on favorite-add, we **store the exact image URL** shown at that moment.

### ✅ Before (`MovieContext.jsx`):

```js
const addToFavorites = (movie) => {
  setFavorites((prev) => [...prev, movie]);
};
```

---

### ✅ After (`MovieContext.jsx`):

```js
const addToFavorites = (movie) => {
  const fixedPoster = movie.poster_path; // already random at display time
  const movieWithFixedImage = { ...movie, poster_path: fixedPoster };

  setFavorites((prev) => [...prev, movieWithFixedImage]);
};
```

This keeps the **exact image** you clicked.

---

### ✅ Result:

Now the image in Favorites matches **exactly what you saw** on Home.

---

## 🔴 **Issue 2: Red Heart Appears on Wrong Image**

### ✅ Problem:

You see a random image in Home, but the heart icon (❤️) is **already red**, even though that image wasn't favorited.

### 🧠 Why?

* We were checking only by `movie.id`:

  ```js
  isFavorite(movie.id)
  ```
* But the image was random — so the same ID could show a new image.

---

### 🔧 ✅ Fix:

Compare **both `movie.id` and `poster_path`** in all functions:

* `isFavorite()`
* `removeFromFavorites()`

---

### ✅ Before:

```js
const isFavorite = (id) => favorites.some(movie => movie.id === id);
```

---

### ✅ After:

```js
const isFavorite = (id, posterPath) =>
  favorites.some(
    (movie) => movie.id === id && movie.poster_path === posterPath
  );
```

Do the same for `removeFromFavorites()`.

---

### ✅ Result:

Hearts only appear red for the **exact same image + ID** that was favorited — no mismatch.

---

## 🔴 **Issue 3: Heart is Still Red on Home (Wrong Image)**

### ✅ Problem:

After saving one version of a random image, the Home page shows a **new** version (same ID), and the heart is red again.

### 🧠 Why?

* You’re still rendering random images on Home
* But checking only by `movie.id`, which doesn’t match anymore

---

### 🔧 ✅ Fix: (in `MovieCard.jsx`)

Update your call to `isFavorite()` to pass both `movie.id` and `poster_path`:

---

### ✅ Before:

```js
const favorite = isFavorite(movie.id);
```

---

### ✅ After:

```js
const favorite = isFavorite(movie.id, movie.poster_path);
```

And same for removing:

```js
removeFromFavorites(movie.id, movie.poster_path);
```

---

### ✅ Result:

The heart reflects only the **exact image + ID combo** that was saved.

---

## 🔴 **Issue 4: Import Error – Cannot Resolve `MovieContext.jsx`**

### ✅ Problem:

Vite throws:

```
Failed to resolve import "../context/MovieContext.jsx"
```

### 🧠 Why?

* File might be missing, wrongly named, or in the wrong folder.
* File extension could be `.js` instead of `.jsx`

---

### 🔧 ✅ Fix:

✅ Correct file structure:

```
src/
  ├── context/
  │    └── MovieContext.jsx
  └── components/
       └── MovieCard.jsx
```

✅ Correct import:

```js
import { useMovieContext } from '../context/MovieContext.jsx';
```

✅ Restart dev server:

```bash
npm run dev
```

---

### ✅ Result:

Import works and context loads properly across components.

---

## 🔴 **Bonus: Styling – Images Not Fitting or Overlapping**

### ✅ Problem:

Random images from `picsum.photos` don’t fit well — either stretched or cut off.

---

### 🧠 Why?

* No Tailwind class for `object-cover` or fixed height

---

### 🔧 ✅ Fix:

Use Tailwind CSS utility classes in `MovieCard.jsx`:

```jsx
<img
  src={movie.poster_path}
  alt={movie.title}
  className="w-full h-48 object-cover rounded"
/>
```

---

### ✅ Result:

All movie cards have uniform image size with proper cropping, no squishing.

---

## ✅ Final Summary

| Issue # | Problem                                        | Fix Summary                                            |
| ------: | ---------------------------------------------- | ------------------------------------------------------ |
|       1 | Favorite images changed after reload           | Stored fixed image URL when saving                     |
|       2 | Heart icon red on wrong image                  | Compared both `id` and `poster_path` in favorite logic |
|       3 | Heart still red due to ID reuse with new image | Passed `id` + `poster_path` to context functions       |
|       4 | Import error with MovieContext                 | Fixed file structure and import path                   |
|       5 | Image display issues                           | Used Tailwind’s `object-cover` and `h-48`              |

---