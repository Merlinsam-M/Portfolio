import {createApp} from '../server.js';

// Vercel supplies this hostname for each deployment. APP_ORIGIN overrides it
// when using a custom production domain.
const origin = process.env.APP_ORIGIN || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);
export default createApp({origin});
