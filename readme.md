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

## Usage

### Importing Passkey Manager

To use Passkey Manager in your project, import it as follows:

```javascript
import { KeyManager } from 'passkey-manager';
```

### Initializing Passkey Manager

Initialize the Passkey Manager as shown below:

```javascript
const keyManager = new KeyManager();
await keyManager.load();
```

### Registering a User

Register a user and verify the registration with your API:

```javascript
try {
  const registration = await keyManager.manager.register('userId', 'userName', 'userDisplayName', 'rpName');
  const registrationVerification = await yourApi.post('/api/verify/registration', registration);
} catch (error) {
  console.error('Error Registering User:', error);
}
```
Replace `yourApi.post` with your API endpoint.

### Authenticating a User

Authenticate a user and verify the authentication with your API:

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

### Checking Registration Status

Determine if the user has previously registered using the current browser:

```javascript
const status = await keyManager.manager.RegistrationStatus();
console.log('Registration Status:', status);
```

## Server Documentation



## API Documentation

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

## Support

For support or any questions, please reach out to [support@email.com](mailto:support@email.com).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
