# Autocomplete Project

## Overview

This project is a React-based Autocomplete component designed to help users search for and select music data, including **artist names**, **album titles**, and **song titles**. The component dynamically fetches and filters suggestions based on the user's input and provides a smooth, user-friendly experience with features such as **debouncing**, **keyboard navigation**, **highlighted matches**, and **limiting results** to a maximum of 10 items.

## Features

1. **Real-time Search Suggestions**: Provides suggestions as the user types, filtering through the provided JSON dataset.
2. **Multiple Search Categories**: Searches across artists, albums, and songs.
3. **Debouncing**: Limits the frequency of search execution to avoid unnecessary processing.
4. **Highlight Matching Text**: Highlights the portion of the suggestion that matches the user's input.
5. **Keyboard Navigation**: Navigate through suggestions using the **up** and **down** arrow keys, and select with **Enter**.
6. **Top 10 Suggestions**: Limits the number of suggestions displayed to the top 10 results.
7. **Click Selection**: Users can click a suggestion to select it.

## Project Structure

```
├── src
│   ├── components
│   │   ├── Autocomplete
│   │   │   ├── Autocomplete.js       # Main autocomplete component
│   │   │   ├── Autocomplete.css      # Styles for the autocomplete component
│   ├── assets
│   │   ├── data.json                 # JSON data file containing music info (artists, albums, songs)
```

## Installation

### Prerequisites

- Node.js (>=12.x)
- npm or yarn

### Steps

1. **Clone the repository**:
   ```
   git clone https://github.com/kevincogan/autocomplete-project.git
   ```
   
2. **Navigate to the project directory**:
   ```
   cd autocomplete-project
   ```

3. **Install the dependencies**:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

4. **Start the development server**:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

5. **Open the application**:
   Visit `http://localhost:3000` to view the application in your browser.


```

## How It Works

1. **Data Input**: As the user types into the input field, the component updates the query state.
2. **Debouncing**: To optimize performance, the input is debounced by 300 milliseconds before executing the search.
3. **Data Filtering**: The search query is compared to the artist, album, and song titles from the `data.json` file. Matches are displayed in a dropdown.
4. **Highlight Matches**: The component highlights the matching portion of the text in the search results.
5. **Keyboard Navigation**: Users can navigate through the list of suggestions using the arrow keys and select an option with the Enter key.
6. **Result Limiting**: The suggestions list is limited to the top 10 results to avoid overcrowding.


## License

This project is licensed under the MIT License.

---