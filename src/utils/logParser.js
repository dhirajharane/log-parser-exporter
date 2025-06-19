function parseLogContent(content, isJson, sourceName) {
  const logEntries = [];

  if (isJson) {
    const jsonLogs = JSON.parse(content);
    jsonLogs.forEach(entry => {
      logEntries.push({
        timestamp: new Date(entry.timestamp || Date.now()),
        logLevel: (entry.logLevel || "OTHER").toUpperCase(),
        message: entry.message || "",
        ip: entry.ip || undefined,
        method: entry.method || undefined,
        url: entry.url || undefined,
        statusCode: entry.statusCode || undefined,
        raw: JSON.stringify(entry),
        source: sourceName,
      });
    });
  } else {
    const lines = content.split('\n').filter(l => l.trim() !== '');
    lines.forEach(line => {
      logEntries.push({
        timestamp: new Date(),
        logLevel: "OTHER",
        message: line,
        raw: line,
        source: sourceName,
      });
    });
  }

  return logEntries;
}

module.exports = { parseLogContent };
