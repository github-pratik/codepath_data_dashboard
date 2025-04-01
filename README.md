# Web Development Project 5 - *Pokémon Dashboard*

Submitted by: **Pratik Patil**

This web app: **A React-based dashboard that fetches and displays Pokémon data from the PokéAPI, allowing users to search and filter through Pokémon information**

Time spent: **10** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard displays 100 unique Pokémon, one per row
  - Each row includes Pokémon image, name, type, height, and base experience
- [x] **`useEffect` React hook and `async`/`await` are used**
  - useEffect is used to fetch data when the component mounts
  - async/await is used for API calls to PokéAPI
- [x] **The app dashboard includes at least three summary statistics about the data** 
  - The app dashboard includes the following statistics:
    - Total number of Pokémon displayed
    - Average base experience across all Pokémon
    - Total number of unique Pokémon types
- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar correctly filters Pokémon by name
  - The list of results dynamically updates as the user types into the search bar
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts Pokémon by type, which is different from the name search
  - The filter correctly displays only Pokémon matching the selected type
  - The dashboard list dynamically updates as the user adjusts the type filter

The following **optional** features are implemented:

- [ ] Multiple filters can be applied simultaneously
- [x] Filters use different input types
  - Text input for the search bar
  - Dropdown selection for the type filter
- [ ] The user can enter specific bounds for filter values

The following **additional** features are implemented:

* [x] Responsive design that works on both desktop and mobile devices
* [x] Visual type badges that are color-coded based on Pokémon type
* [x] Loading state displayed while fetching data

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />


## Notes

Challenges encountered while building the app:
- Managing the complex nested structure of the PokéAPI responses
- Implementing proper error handling for API requests
- Optimizing performance when fetching detailed data for multiple Pokémon
- Creating a responsive design that works well on different screen sizes

## License

    Copyright [2025] [Pratik Patil]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
