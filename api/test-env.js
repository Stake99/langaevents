// Test endpoint to check environment variables (REMOVE AFTER TESTING!)
module.exports = async (req, res) => {
  // Console log all values for debugging
  console.log('=== SMTP Environment Variables ===');
  console.log('SMTP_HOST:', process.env.SMTP_HOST);
  console.log('SMTP_PORT:', process.env.SMTP_PORT);
  console.log('SMTP_SECURE:', process.env.SMTP_SECURE);
  console.log('SMTP_USER:', process.env.SMTP_USER);
  console.log('SMTP_USER length:', process.env.SMTP_USER?.length);
  console.log('SMTP_USER type:', typeof process.env.SMTP_USER);
  console.log('SMTP_PASS exists:', !!process.env.SMTP_PASS);
  console.log('SMTP_PASS length:', process.env.SMTP_PASS?.length);
  console.log('SMTP_PASS type:', typeof process.env.SMTP_PASS);
  console.log('SMTP_FROM_EMAIL:', process.env.SMTP_FROM_EMAIL);
  console.log('SMTP_FROM_NAME:', process.env.SMTP_FROM_NAME);
  console.log('SMTP_TO_EMAIL:', process.env.SMTP_TO_EMAIL);
  console.log('SMTP_REJECT_UNAUTHORIZED:', process.env.SMTP_REJECT_UNAUTHORIZED);
  
  // Check for whitespace issues
  console.log('SMTP_USER trimmed:', process.env.SMTP_USER?.trim());
  console.log('SMTP_USER has whitespace:', process.env.SMTP_USER !== process.env.SMTP_USER?.trim());
  
  console.log('===================================');
  
  return res.status(200).json({
    message: 'Check Vercel function logs for console output',
    hasHost: !!process.env.SMTP_HOST,
    hasPort: !!process.env.SMTP_PORT,
    hasSecure: !!process.env.SMTP_SECURE,
    hasUser: !!process.env.SMTP_USER,
    hasPass: !!process.env.SMTP_PASS,
    hasFromEmail: !!process.env.SMTP_FROM_EMAIL,
    hasToEmail: !!process.env.SMTP_TO_EMAIL,
    // Show values (except password)
    host: process.env.SMTP_HOST || 'MISSING',
    port: process.env.SMTP_PORT || 'MISSING',
    secure: process.env.SMTP_SECURE || 'MISSING',
    user: process.env.SMTP_USER || 'MISSING',
    userLength: process.env.SMTP_USER?.length || 0,
    passLength: process.env.SMTP_PASS?.length || 0,
    fromEmail: process.env.SMTP_FROM_EMAIL || 'MISSING',
    toEmail: process.env.SMTP_TO_EMAIL || 'MISSING',
    // Check if values are strings
    userType: typeof process.env.SMTP_USER,
    passType: typeof process.env.SMTP_PASS
  });
};
