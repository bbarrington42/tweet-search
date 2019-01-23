// Miscellaneous utilities

// Convert to millis from string format, ex: "Wed Jan 23 19:00:06 +0000 2019"
exports.millisFromString = (dateString) => {
    return new Date(dateString).getTime();
}
