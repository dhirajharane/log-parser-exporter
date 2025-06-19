const { parseLogContent } = require('../src/utils/logParser');

describe('Log Parser Utility', () => {
  it('should parse JSON log content correctly', () => {
    const jsonContent = JSON.stringify([
      {
        timestamp: '2024-06-19T10:00:00Z',
        logLevel: 'INFO',
        message: 'Test log message',
        ip: '127.0.0.1'
      }
    ]);
    
    const result = parseLogContent(jsonContent, true, 'test.json');
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      logLevel: 'INFO',
      message: 'Test log message',
      ip: '127.0.0.1',
      source: 'test.json'
    });
    expect(new Date(result[0].timestamp)).toEqual(new Date('2024-06-19T10:00:00Z'));
  });

  it('should parse plain text log content correctly', () => {
    const textContent = 'This is a log line\nAnother line';
    const result = parseLogContent(textContent, false, 'test.log');
    
    expect(result).toHaveLength(2);
    expect(result[0].message).toBe('This is a log line');
    expect(result[1].message).toBe('Another line');
    expect(result[0].source).toBe('test.log');
  });

  it('should handle empty content gracefully', () => {
    const result = parseLogContent('', false, 'empty.log');
    expect(result).toEqual([]);
  });
});
