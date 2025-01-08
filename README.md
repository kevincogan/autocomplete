# Autocomplete Project

## Overview

This project is a React-based Autocomplete component designed to provide users with a seamless search and selection experience for music-related data. It allows searching through **artist names**, **album titles**, and **song titles**. With dynamic fetching, filtering, and a polished user interface, this component offers features such as **debouncing**, **keyboard navigation**, **highlighting matches**, and **limiting results** to the top 10 items.

## Features

1. **Real-time Search Suggestions**: Dynamically filters and displays suggestions as users type, using data from a JSON dataset.
2. **Multiple Search Categories**: Supports searching across artists, albums, and songs in a single input field.
3. **Debouncing**: Prevents frequent and redundant searches by introducing a delay (300ms) after user input.
4. **Highlight Matching Text**: Highlights matching portions of text in the suggestions for clarity and ease of use.
5. **Keyboard Navigation**: Allows navigating suggestions using **arrow keys** and selecting them with the **Enter** key.
6. **Top 10 Suggestions**: Restricts the number of displayed suggestions to the 10 most relevant results to maintain a clean UI.
7. **Click Selection**: Enables users to click on a suggestion to make a selection.

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
   ```bash
   git clone https://github.com/kevincogan/autocomplete-project.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd autocomplete-project
   ```

3. **Install the dependencies**:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

5. **Open the application**:
   Open `http://localhost:3000` in your browser to view the application.

## How It Works

1. **Data Input**: Users type into the input field, which updates the internal query state in real time.
2. **Debouncing**: To optimize performance, the input is debounced by 300 milliseconds before triggering the search function.
3. **Data Filtering**: The search query is matched against artist names, album titles, and song titles in the `data.json` file. Matching results are displayed in a dropdown.
4. **Highlight Matches**: The matching portion of each suggestion is highlighted for better visibility.
5. **Keyboard Navigation**: Users can navigate through the list of suggestions using the **arrow keys** and select a suggestion with the **Enter** key.
6. **Result Limiting**: The suggestions dropdown is capped at the top 10 results to maintain focus and avoid clutter.

## Additional Notes

- **Customization**: The component can be customized further for other use cases or datasets.
- **Responsiveness**: The component is styled for a responsive and user-friendly experience across devices.

## License

This project is licensed under the MIT License.

