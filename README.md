# Laravel File Sharing App

This project is based on the laravel-starter-kit and uses React, Vite, and Inertia.js. This test application implements secure user authentication and functionality for uploading and sharing files through one-time password-protected download links.
The app combines spa and ssr thanks to Inertiajs.

## Technologies

- Laravel (backend)
- React + Vite (frontend)
- Inertia.js (frontend-backend bridge)
- Sanctum (authentication)
- Policies (since one user, the policy are rather dummy)
- PostgreSQL

## Core Features

1. **Registration and Login**
   - Implemented using Laravel Sanctum
   - Route access is protected using Policies 

2. **User Dashboard**
   - After login, each user is redirected to their personal dashboard
   - Features:
     - Upload files
     - Generate one-time download links with passwords
     - Files can only be downloaded once via the unique link and password
     - View list of uploaded files
     - View all links created for each file and their status (used or not used)
    
## UI and Libraries

The project uses modern React libraries and UI patterns:

- **Radix UI** — accessible and customizable UI primitives
- **next-themes** — theme switching (light/dark), which **replaces the default Laravel Starter Kit theme management**
- **react-hot-toast** — toast notifications for user feedback

## Main Project Components

- [FileTable](https://github.com/DimaOshchepkov/laravel-image-service/blob/main/resources/js/components/file-table.tsx)
- [UserFilesController](https://github.com/DimaOshchepkov/laravel-image-service/blob/main/app/Http/Controllers/UserFilesController.php)


## Quick Start

```bash
git clone https://github.com/DimaOshchepkov/laravel-image-service.git
cd laravel-image-service
```
Change the variables below from env to yours

```env
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=laravel-image-service
DB_USERNAME=laravel-image-service
DB_PASSWORD=qwert1234
```
> Note: The .env file is included in the repository because this is a learning/demo project. Do not use real credentials or secrets in such projects.

```bash
composer install
npm install
php artisan migrate
npm run dev

php artisan migrate
```

## Screenshots
![main page](https://github.com/user-attachments/assets/cd80f7e9-96d9-41d9-ab5a-da328908931e)
![dashbord](https://github.com/user-attachments/assets/5be7830b-a21f-4d1e-a697-e6cddc6d9298)
![list links](https://github.com/user-attachments/assets/12be626b-c15c-4d67-a7c5-71dff7f2f1ef)

## Known Issues

- Since there is only one role in the system, the politicians are rather fictitious.
- [ImageGalery](https://github.com/DimaOshchepkov/laravel-image-service/blob/main/resources/js/components/image-gallery.tsx) is of type h-[calc(100vh-6rem)], which depends on the other component






