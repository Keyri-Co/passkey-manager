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

## Main Concept

A passkey is like a phone number or email: once verified, it's associated with a user. If you want to verify a user in the future, you can just check that they control the email or phone-number they proved ownership of before.

But unlike those, a passkey is a unique key tied to a physical device, making it harder to compromise.

When a user is logged in and registers a passkey, your job is to tie the passkey's ID to that user in your database.

When a user is trying to authenticate and gives you a passkey id, your job is to look up the user by that ID.

We validate the passkey, we store the public key, we take care of the rest.

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
