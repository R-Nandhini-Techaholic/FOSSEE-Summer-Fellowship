# FOSSEE-Summer-Fellowship

## Overview
I worked on improving the user interface and overall experience of our existing workshop booking web app. The old design was a bit clunky, especially on phones, so I aimed to make it feel cleaner and easier to use. I kept the existing Django backend exactly as it was and added some React components via CDN to handle the frontend interactivity without needing a complicated build process.

## Design Approach
My main goal was a mobile-first approach. Because a lot of people check things on their phones, the layout needed to adapt well to smaller screens. I focused on reducing clutter by removing unnecessary borders and spacing things out nicely. Instead of cramming everything onto the screen at once, I tried to guide the user through the process more naturally.

## Key Improvements
I built a few reusable React components like `Card`, `FormInput`, `FormSection`, and `Button` to keep the code organized and consistent.

- **Login Page:** I changed the old login view into a clean, centered card. I also added a loading spinner and better error handling that works nicely with Django's built-in CSRF and form errors.
- **Registration Form:** The original sign-up page was a massive table of inputs. I broke it down into a 3-step form. I grouped related fields together and added client-side checks for things like matching passwords and phone numbers. There's also a simple progress indicator now with smooth transitions.
- **Navbar:** I updated the navigation bar to have a responsive hamburger menu for mobile devices. It automatically closes when you click outside or select a link, and it dynamically grabs routing URLs straight from the Django context.
- **Forgot Password Page:** Similar to the login, I moved this to a centered card wrapper. It focuses purely on one action—sending the reset link—and gives clear loading and success feedback when you submit it.
- **UI/UX Enhancements:** I added small details like toast notifications, smooth sliding animations between form steps, and clear visual changes when you click a button or focus on an input.
- **Accessibility:** I made sure to include things like `aria-live` for error messages, clear `aria-invalid` states for form validation, and explicitly linked labels to their inputs so screen readers can understand the form correctly.

## Responsiveness
Everything was styled with mobile users in mind first. Inputs span the full width on small screens and card margins shrink so we don't waste valuable screen real estate. The navbar collapses perfectly to a dropdown so it doesn't take up half the phone screen.

## Performance Considerations
I purposely avoided bringing in heavy libraries or a full Node/Webpack toolchain. By using lightweight, custom CSS and pulling in simple React UI through a CDN, the pages stay incredibly fast. This also meant I didn't have to rewrite the Django server rendering structure from scratch.

## Challenges Faced
The hardest part was definitely converting the old table-based registration form into a modern multi-step React form. I had to figure out how to keep the form fields mounted in the DOM even when they were hidden in other steps so that the native HTML form submission to Django would actually harvest and send all the data properly. Getting React state to play nicely with standard Django form compatibility was tricky.

## Setup Instructions
If you want to run this locally, the steps are pretty standard:

1. Clone the repository and navigate into the folder.
2. Activate your Python virtual environment.
3. Start the development server by running: `python manage.py runserver`
4. Open your browser and go to `http://127.0.0.1:8000`.

## Screenshots
**Before**

<img width="1671" height="728" alt="login" src="https://github.com/user-attachments/assets/71a34ad3-325c-4d79-801d-9a003693a97b" />
<img width="1523" height="740" alt="register" src="https://github.com/user-attachments/assets/607d6db6-9a94-4d0c-9f32-9cf269415e18" />
<img width="928" height="517" alt="password reset" src="https://github.com/user-attachments/assets/a59bcc13-b2e4-4af0-9c43-9dd2b8ca94b4" />

**After**

<img width="1881" height="903" alt="login new" src="https://github.com/user-attachments/assets/15cdbcbc-4c9a-47bb-96c5-ca2b0961ec43" />
<img width="1876" height="915" alt="register new" src="https://github.com/user-attachments/assets/3056c3aa-edcf-4cea-ac39-83516bb8846e" />
<img width="1902" height="903" alt="pwd reset new" src="https://github.com/user-attachments/assets/76968c4d-5a57-4833-8cb5-93db8adb2e03" />
<img width="1862" height="890" alt="stats new" src="https://github.com/user-attachments/assets/4307d644-954f-4241-87b2-e4619287f24f" />

---

I focused more on improving user flow and reducing friction rather than just changing the visual design. This project helped me understand how small UX changes can significantly improve usability.

---
