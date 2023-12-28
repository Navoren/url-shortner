# URL Shortener

This is a URL shortener application built using Node.js and MongoDB. It utilizes the `shortid` npm package to generate short and unique IDs for the shortened URLs. Additionally, it provides analytics about the links.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Navoren/url-shortener.git
    ```

2. Install the dependencies:

    ```bash
    cd url-shortener
    npm install
    ```

3. Configure the MongoDB connection:

    Update the MongoDB connection URL in the `connect.js` file.

4. Start the server:

    ```bash
    npm start
    ```

## Usage

To shorten a URL, send a POST request to the `/url` endpoint with the original URL in the request body. The server will respond with the shortened URL.

To access the original URL from the shortened URL, simply make a GET request to the shortened URL.

To view analytics about a shortened URL, send a GET request to the `/url/analytics/:id` endpoint, where `:id` is the ID of the shortened URL. The server will respond with information such as the number of times the URL has been accessed and the date of creation.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- shortid

## License

This project is licensed under the [MIT License](LICENSE).
