import minimist from 'minimist';
import { adminAuth } from '@/lib/config/firebase-admin';

const args = minimist(process.argv.slice(2));
if (!args.email) {
  console.error('Please provide an email address with --email');
  process.exit(1);
}

async function showClaims(email: string) {
  console.log(`Fetching user with email ${email}...`);
  const user = await adminAuth.getUserByEmail(email);
  console.log('User:', user.displayName);
  console.log('Claims:', user.customClaims || 'none');
}

showClaims(args.email);
