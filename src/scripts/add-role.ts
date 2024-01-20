import minimist from 'minimist';
import { adminAuth } from '@/lib/config/firebase-admin';

const args = minimist(process.argv.slice(2));
if (!args.email) {
  console.error('Please provide an email address with --email');
  process.exit(1);
}
if (!args.role) {
  console.error('Please provide a role with --role');
  process.exit(1);
}

async function addRole(email: string, role: string) {
  console.log(`Fetching user with email ${email}...`);
  const user = await adminAuth.getUserByEmail(email);

  console.log('User found:', user.displayName);
  console.log(`Adding ${role} role to ${email}...`);

  const claims = user.customClaims || {};
  claims['role'] = role;
  await adminAuth.setCustomUserClaims(user.uid, claims);

  console.log('Done!\nClaims:', claims);
}

addRole(args.email, args.role);
