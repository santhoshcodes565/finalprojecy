/**
 * Utility to generate unique transaction IDs
 * Format: TXN + timestamp + random string
 */
exports.generateTransactionId = () => {
    const timestamp = Date.now().toString();
    const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `TXN${timestamp}${randomChars}`;
};
