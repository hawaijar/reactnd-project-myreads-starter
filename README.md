# MyReads - A simple book tracking App

### Basic useful feature list:

 * Navigation of books from one shelf to another (**Reading, Read, Want to Read**)
 * You can add, search and update  new books and put on their shelves
 * Each book's location are tracked and maintained consistently by the App
 * Introduce concept of interacting with external end-point(API) for reading and 
   updating books status/shelf.
 * Applied Lodash utility to accomplish certain immutable operations - filter, removing duplicates of objects etc.
 * Used High Order Components to extract common logic and behaviors.
 
 
 ### Installing
 The application was created with *create-react-app*. You don't need to install it as the structure 
 will be there when you *git clone* this repository.
 
 All the dependencies are mentioned/updated in the *package.json*
 You can install them using npm. If you already installed yarn, 
 you can use the second command below to install the project dependencies.
 * *npm install*
    OR
 * *yarn install*
 
 ### Running
 * *yarn start* OR *npm start*
 
 ### Testing

 The application will be starting at http://localhost:3000/
 
 1. Main Page
 
 * The main page should show 3 shelves for books.
 * Each book has a control (bottom right)
  clicking on which displays a drop-down menu where we can move books to another shelf.
 * When the browser is refreshed, the same information is displayed on the page. If a books' shelf has been changed to another shelf,
 it should be updated to the back-end server. Refreshing of the page should display the latest updated shelf of each books.
 
 2. Search Page
 
 From the main page, below (right corner) is a plus-sign icon (red back-ground). Clicking on which shall 
 go to the Search page and the URL in the browser’s address bar is */search*
 
 * The search page has a search input field. As the user types into the search field, books that match the query are displayed on the page.
 * Search results on the search page allow the user to select “currently reading”, “want to read”, or “read” to place the book in a certain shelf.
 * When an item is categorized on the search page, and the user navigates to the main page, it appears on that shelf in the main page.
 * The search page contains a link to the main page. When the link is clicked, the main page is displayed and the URL in the browser’s address bar is /.
 
 ### License
 **MIT**