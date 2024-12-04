<?php
require_once '../data/config.php';

function fetchWeather($params) {
    $query = http_build_query($params);
    $cacheFile = CACHE_DIR . md5($query) . '.json';

    // Check cache
    if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < CACHE_EXPIRY) {
        return json_decode(file_get_contents($cacheFile), true);
    }

    // Fetch from API
    $url = "https://api.openweathermap.org/data/2.5/forecast?{$query}&appid=" . API_KEY . "&units=metric";
    $response = file_get_contents($url);

    if ($response) {
        file_put_contents($cacheFile, $response); // Save to cache
        return json_decode($response, true);
    }

    return null; // Handle API failure
}

$params = [];
if (isset($_GET['city'])) {
    $params['q'] = htmlspecialchars($_GET['city']);
} elseif (isset($_GET['lat']) && isset($_GET['lon'])) {
    $params['lat'] = htmlspecialchars($_GET['lat']);
    $params['lon'] = htmlspecialchars($_GET['lon']);
}

if (!empty($params)) {
    $weatherData = fetchWeather($params);

    if ($weatherData) {
        echo json_encode($weatherData);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Unable to fetch weather data.']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid parameters.']);
}
?>
