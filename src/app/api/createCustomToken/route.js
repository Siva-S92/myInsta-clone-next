import admin from 'firebase-admin';

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

export async function POST(request) {
  try {
    const { uid } = await request.json(); // Get the user ID from the request body

    // Create a custom token for the provided UID
    const customToken = await admin.auth().createCustomToken(uid);

    return new Response(JSON.stringify({ customToken }), { status: 200 });
  } catch (error) {
    console.error('Error creating custom token:', error);
    return new Response(JSON.stringify({ error: 'Failed to create custom token' }), { status: 500 });
  }
}
