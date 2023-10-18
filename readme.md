# Passkey Manager

**Passkey Manager** is a JavaScript module designed to manage WebAuthn registration and authentication processes. It aims to de-mystify and simplify the whole 'PassKey' process, and get you up and running in under 15 - 30 minutes.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Server Documentation](#server-documentation)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

## Installation

To install Passkey Manager, run the following command in your project directory:

```
npm install passkey-manager
```

## How It Works

Passkeys can be used to identify your site's users with high confidence since they're

- a.) Locked to your user's device
- b.) Can't Be Stolen or Forged
- c.) Typically Requires Biometrics to Use

### Registration

Once the user has logged in, they'll create a new passkey on their side and give you the passkey's ID and a payload - which verifies the passkey they created.

Next, you send the payload to our API to be decrypted and verified.

Once verified, you need to associate the passkey's ID with that user in your database.

That's it! In the future, anyone who can verify ownership of that passkey ID must be _THAT_ user! Simple, right?

### Authentication

This is flexible enough to work however you want to do it; but here's what works for us:

Someone sends you a passkey id of ${x}, and a verification payload.

Send the payload to our API to be verified.

If its verified, look up the user in your database by their passkey-id.

Now that you've authenticated the user, set a session cookie or something.

## Browser Library

### Importing and Initializing Passkey Manager

To use Passkey Manager in your project, import and instantiate it as follows:

```javascript
import { KeyManager } from 'passkey-manager';

const keyManager = new KeyManager();
await keyManager.load();
```

### Checking Registration Status

Check if the user has a Passkey on your site with their current browser.

```javascript
const status = await keyManager.manager.RegistrationStatus();
console.log('Registration Status:', status);
```

### Creating a Passkey

You can create a new Passkey by triggering the `register` method, and sending the response to your API. (Replace `yourApi.post` with your API endpoint.)

```javascript
try {
  const registration = await keyManager.manager.register('userId', 'userName', 'userDisplayName', 'rpName');
  const registrationVerification = await yourApi.post('/api/verify/registration', registration);
} catch (error) {
  console.error('Error Registering User:', error);
}
```

### Authenticating a Passkey

You can have the user verify their Passkey by using the `authenticate` method and sending the response to your API.

```javascript
try {
  const authenticationData = await keyManager.manager.authenticate();
  const userData = await yourApi.post('/api/verify/authentication', authenticationData);
} catch (error) {
  console.error('Authentication Error:', error);
}
```

### Auto-fill Operation

Enhance the user experience by auto-filling passkeys when a user clicks into an input field. Ensure the input field has the attribute `autocomplete="webauthn"`:

```javascript
const success = await keyManager.manager.autoFill();
console.log('Auto-fill Success:', success);
```

## Client Library Documentation

### KeyManager

#### Methods

- **load(): Promise<void>**
  - Initializes the PassKeys instance.
  - Returns a promise that resolves when the manager is loaded.

### PassKeys

#### Methods

- **register(userId: string, userName: string, userDisplayName: string, rpName: string): Promise<{ id: string; payload: string }>**
  - Registers a user, initializes the IndexedDB, and stores the encrypted registration results.
  - Returns a promise with the registration ID and the Base64 encoded encrypted results.

- **authenticate(autoFill?: boolean): Promise<{ id: string; payload: string }>**
  - Initiates WebAuthn authentication and returns the encrypted results.
  - Returns a promise with the authentication ID and the Base64 encoded encrypted results.

- **autoFill(): Promise<boolean>**
  - Performs an auto-fill operation based on WebAuthn.
  - Returns a promise indicating the success of the operation.

- **RegistrationStatus(): Promise<string>**
  - Checks the user's registration status with the IndexedDB.
  - Returns a promise indicating the registration status.


## Server Documentation

First, register your site with [Keyri](https://app.keyri.com/sign-up).

Next, under "Setup And Credentials", get your `Application Key`.

### Temporary Key

To drop latency, and lower the amount of database calls we have to make - you need to get a temporary-key that's good for 24 hours, which you can get like this:

```bash
curl -X GET https://api-keys.keyri.com -H "x-api-key: qr...P1U"
```

which returns the following:

```javascript
{
    "ttl": 1697723187193,
    "key": "eyJ...SJ9"
}
```
### Register

When verifying a user's registration request, forward whatever they sent you to our API [https://passkeys.keyri.com/v1/register]:

```javascript
// Data from user
{"id": "xxx", "payload": "eyJhd...xe=="}
```

```bash
curl -X POST https://passkeys.keyri.com/v1/register \
-H "Content-Type: application/json" \
-H "x-api-key: qr...P1U" \
-H "x-temp-key: eyJ...SJ9" \
-d '{"id": "xxx", "payload": "eyJhd...xe=="}'
```

### Authenticate

## Support

For support or any questions, please reach out to [support@email.com](mailto:support@email.com).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
