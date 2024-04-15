# React Bookstore Application

## Description
This project is a React-based web application for managing a bookstore. It features a single-page interface where users can view, add, modify, and delete books. The main page displays a list of books with key details and interactive options for each entry.

## Key Features
- **Book List Display**: Each book's entry shows its name, price, category, and options to edit or delete.
- **Add Book**: A dedicated button at the top of the main page allows users to add books through a pop-up form.
- **View and Manage Book Details**: Clicking on a book opens a new page with detailed information. A vertical dots icon provides additional options like edit and delete.
- **Interactive Icons**: Each book in the list also has direct icons for editing and deleting for quick access.
- **Batch Delete**: Users can delete multiple books at once from the main list.
- **Search Functionality**: Includes a search option to find books based on attributes listed in the table.
- **Responsive UI**: Toast notifications for actions, ellipses with tooltips for long titles, and a clean, user-friendly interface.

## Getting Started

### Prerequisites
- Node.js and npm (Node Package Manager)
- Basic knowledge of React and TavaScript

### Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/react-bookstore.git
cd react-bookstore
```

2. Install dependencies

```bash
npm install
```

3. Start the development server
```bash
npm run dev
```
This will run the app in development mode. Open http://localhost:3000 to view it in the browser.

## Usage
- **Adding a Book**: Click 'Add Book' to open the entry form, fill it out, and submit to add the book to your list.
- **Viewing Book** Details: Click on any book in the list to view its detailed page. - Use the vertical dots icon for more options like editing or deleting.
- **Editing and Deleting**: Use the direct icons in the book list or the options in the book detail view to edit or delete books as needed.
- **Batch Deletion**: Select multiple books in the list and use the batch delete feature for efficient management.
- **Searching Books**: Utilize the search bar to quickly locate books by any listed attribute.

## Build With
- [React](https://react.dev/) - A JavaScript library for building user interfaces
- [Next.js](https://nextjs.org/) - A React framework for production
- [TanStack Table](https://tanstack.com/table/v7/) - For building flexible and extensible tables
- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development
- [Shadcn/ui](https://ui.shadcn.com/) - Provides pre-styled and utility components for streamlined development