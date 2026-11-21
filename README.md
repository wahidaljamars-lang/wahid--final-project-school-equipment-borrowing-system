# CICS School Equipment Borrowing Management System

## Team Members

- Teyshan Kyle Silveo
- January Heaven Chiong
- Aljamar Wahid
- Karil Narma
- Carl Williamson H. Maani

A responsive, browser-only equipment borrowing system for the College of Information and Computer Sciences (CICS) at Zamboanga Peninsula Polytechnic State University (ZPPSU). The app uses HTML, CSS, vanilla JavaScript, and browser LocalStorage; it has no server, framework, or database dependency.

## Run the application

Open `index.html` in a modern browser. If the browser restricts Web Crypto or LocalStorage for `file://` pages, serve this folder from a local static web server (for example, VS Code Live Server). No PHP, MySQL, build step, or package installation is required.

On first launch, the app creates the demo administrator and borrower accounts in that browser profile's LocalStorage. Public registrations are borrower accounts and require administrator verification of their CICS affiliation before they can submit requests. Administrators can create staff and other accounts under **Accounts**.

## Demo accounts

These demo accounts are provisioned the first time the app opens in each browser profile:

- **Administrator email:** `admin@test.com`
- **Administrator password:** `admin123`
- **Borrower email:** `borrower@test.local`
- **Borrower password:** `borrowerpass123`

The accounts are stored separately in each browser profile's LocalStorage; they are not synchronized between Chrome and other browsers. The demo borrower is verified so you can test the borrowing flow. Administrators can select **View borrowing** beside a borrower in **Accounts** to review that person's requests, equipment, dates, status, and return condition.


## Features

- Role-aware dashboards for administrators, authorized personnel, and student/faculty borrowers.
- Separate sign-in portals for administrators/authorized personnel and borrowers, with role validation at login.
- Searchable and filterable CICS equipment catalog with seeded sample inventory, categories, quantities, condition, and optional picture uploads stored in LocalStorage.
- Local photographs for the seeded catalog items, with item-specific illustrations available as offline-safe fallbacks for custom or unavailable images.
- Administrator equipment/category management and borrower account verification/activation.
- Borrowing requests with purpose, dates, item quantities, acknowledgement, review/assignment, approval or rejection, release, and return inspections.
- Overdue monitoring, notifications, activity history, printable reports, and CSV export.
- Responsive layouts for desktop and mobile.

## Data and security limitations

- All records and the current session are stored in the browser's LocalStorage. They are local to that browser profile/device and are not shared with other users or synchronized to a central system. Clearing browser site data deletes the records.
- Uploaded equipment pictures are resized and stored in LocalStorage; choose JPG, PNG, or WebP files up to 10 MB. Browser storage limits still apply.
- Passwords are salted and hashed with the browser Web Crypto API, but this is a local demonstration, not production authentication. Anyone with access to the browser profile or developer tools can inspect or alter the data, and client-side roles are not a security boundary.
- Borrower affiliation is supplied by the user. Administrator verification is a manual workflow and does not connect to a ZPPSU identity directory.
- This system is scoped to CICS inventory only; it does not manage equipment from other colleges or departments.

## Image attribution

The seeded equipment photographs are used from Unsplash under the [Unsplash License](https://unsplash.com/license). Original SVG illustrations remain embedded in the application as offline fallbacks for custom items or missing images.
