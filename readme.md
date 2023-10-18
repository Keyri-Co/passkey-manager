# Passkey Manager

**Passkey Manager** is a JavaScript module designed to manage WebAuthn registration and authentication processes. It aims to de-mystify and simplify the whole 'PassKey' process, and get you up and running in under 15 - 30 minutes.

WebAuthn (Passkeys) is a web standard introduced by the World Wide Web Consortium (W3C) to revolutionize the way users authenticate online. By eliminating the need for passwords, Passkeys offer a more secure, phishing-resistant, and user-friendly authentication method, relying on biometrics, hardware tokens, or mobile devices. Integrating Passkeys can significantly enhance user security and provide a seamless login experience, making it a crucial step forward in modern web development.

---

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Server Documentation](#server-documentation)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

---

## Installation

To install Passkey Manager, run the following command in your project directory:

```
npm install passkey-manager
```

---

## Key Concepts

Passkeys are a more secure alternative to using passwords, SMS Text Message Verification, or Email Link Verification to identify users because they're

- Locked in user's device
- Can't Be Stolen or Forged
- Typically Require Biometrics to Use

Below is a _HIGH_ level overview of how you can easily integrate them into your site:

### Registration

1. Once the user has logged in, they'll create a new passkey on their side and give you the passkey's ID and a payload - which verifies the passkey they created.

2. Next, you send the payload to our API to be decrypted and verified.

3. Once verified, you need to associate the passkey's ID with that user in your database.

That's it! In the future, anyone who can verify ownership of that passkey ID must be _THAT_ user! Simple, right?

### Authentication

This is flexible enough to work however you want to do it; but here's what works for us:

1. Someone sends you a passkey id of ${x}, and a verification payload.

2. Send the payload to our API to be verified.

3. If its verified, look up the user in your database by their passkey-id.

Now that you've authenticated the user, set a session cookie or something.

---

## Browser Library

### Importing and Initializing Passkey Manager

To use Passkey Manager in your project, import and instantiate it as follows:

```javascript
import { KeyManager } from 'passkey-manager';

const keyManager = new KeyManager();
await keyManager.load();
```

### Checking Registration Status

To check if a user has already registered a Passkey with your site, use the following method:

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

---

## Client Library Documentation

### KeyManager

#### Methods

- **load(): Promise<void>**
  - Returns a promise that resolves when the manager is loaded.

### manager

#### Methods

- **register(userId: string, userName: string, userDisplayName: string, rpName: string): Promise<{ id: string; payload: string }>**
  - Creates a Passkey for your site on the user's device
  - Returns a promise with the passkey ID and the Base64 encoded encrypted results.

- **authenticate(autoFill?: boolean): Promise<{ id: string; payload: string }>**
  - Initiates Passkey authentication.
  - Returns a promise with the passkey ID and the Base64 encoded encrypted results.

- **autoFill(): Promise<boolean>**
  - Performs an auto-fill operation based on WebAuthn.
  - Returns a promise indicating the success of the operation.

- **RegistrationStatus(): Promise<string>**
  - Checks the user's registration status with the IndexedDB.
  - Returns a promise indicating the registration status.

---

## Server Documentation

First, register your site with [Keyri](https://app.keyri.com/sign-up).

Next, under "Setup And Credentials", get your `Application Key`.

### Temporary Key

To drop latency, - you need to get a temporary-key that's good for 24 hours, which you can get like this:

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

This will be used in future API Calls such as `register` and `authenticate`

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

When verifying a user's authentication request, forward whatever they sent you to our API [https://passkeys.keyri.com/v1/authenticate]:

```javascript
// Data from user
{"id": "xxx", "payload": "eyJhd...xe=="}
```

```bash
curl -X POST https://passkeys.keyri.com/v1/authenticate \
-H "Content-Type: application/json" \
-H "x-api-key: qr...P1U" \
-H "x-temp-key: eyJ...SJ9" \
-d '{"id": "xxx", "payload": "eyJhd...xe=="}'
```

---

## Support

For support or any questions, please reach out to [support@keyri.com](mailto:support@keyri.com).

---

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
