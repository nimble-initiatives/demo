import store from '@/store';

export const POST = async ({ request }: { request: Request }) => {
  try {
    // Extract the data from the request body
    const { documentId, counterName } = await request.json();
    console.log('Incrementing counter:', documentId, counterName);

    // Open a session with RavenDB
    const session = store.openSession();

    // Increment the counter on the specified document
    session.countersFor(documentId).increment(counterName);

    // Save changes to the session (commits the operation to the database)
    await session.saveChanges();



    // Return a successful response
    return new Response(
      JSON.stringify({ success: true, message: 'Counter incremented successfully' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error incrementing counter:', error);

    // Return an error response
    return new Response(
      JSON.stringify({ success: false, message: 'Failed to increment counter' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
