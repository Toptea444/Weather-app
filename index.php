<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Robust Weather App</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.7.6/lottie.min.js"></script>
</head>
<body class="bg-gradient-to-br from-blue-500 to-blue-700 text-white min-h-screen dark:bg-gray-900 dark:text-gray-100">
    <div class="container mx-auto p-6">
        <h1 class="text-center text-3xl font-bold mb-6">Weather App</h1>
        <div class="flex justify-center mb-4 space-x-4">
            <button id="geoButton" class="bg-green-500 px-4 py-2 rounded-md">Use My Location</button>
            <button id="themeToggle" class="bg-gray-700 px-4 py-2 rounded-md text-white">Toggle Theme</button>
        </div>
        <form id="searchForm" class="flex justify-center mb-6">
            <input type="text" id="city" class="p-3 rounded-l-md w-2/3" placeholder="Enter city...">
            <button class="bg-blue-600 px-4 py-3 rounded-r-md">Search</button>
        </form>
        <div id="loading" class="hidden text-center">
            <svg class="animate-spin h-10 w-10 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
        </div>
        <div id="weatherContainer" class="hidden">
            <h2 id="location" class="text-2xl font-bold text-center mb-4"></h2>
            <p id="description" class="text-center italic"></p>
            <div id="weatherAnimation" class="w-40 h-40 mx-auto my-6"></div>
            <div id="forecast" class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6"></div>
        </div>
        <p id="errorMessage" class="text-center text-red-500 hidden"></p>
    </div>
    <script src="assets/scripts.js"></script>
</body>
</html>
