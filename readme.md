# Passkey Manager

Passkey Manager is a JavaScript module designed to manage WebAuthn registration and authentication processes, providing utilities for encryption, decryption, and database operations.

## Installation

To install Passkey Manager, run the following command in your project directory:

```
npm install passkey-manager
```

## Usage

### Importing Key Manager

To use Key Manager in your project, import it as follows:

```javascript
import { KeyManager } from 'passkey-manager';
```

### Initializing Passkey Manager

```javascript
const keyManager = new KeyManager();
await keyManager.load();
```

### Registering a User

```javascript
try {
  const registration = await keyManager.manager.register('userId', 'userName', 'userDisplayName', 'rpName');
  console.log('Registration ID:', registration.id);
  console.log('Registration Payload:', registration.payload);
} catch (error) {
  console.error('Error Registering User:', error);
}
```

### Authenticating a User

```javascript
try {
  const authenticationData = await keyManager.manager.authenticate();
  console.log('Authentication Data:', authenticationData);
} catch (error) {
  console.error('Authentication Error:', error);
}
```

### Auto-fill Operation

This provides a cleaner ux into passkeys, and is triggered when a user clicks into an input field. The input field should have the attribute `autocomplete="webauthn"` set in order to work.

```javascript
const success = await keyManager.manager.autoFill();
console.log('Auto-fill Success:', success);
```

### Checking Registration Status

```javascript
const status = await keyManager.manager.RegistrationStatus();
console.log('Registration Status:', status);
```

## API Documentation

### KeyManager

#### Methods

- **load(): Promise<void>**
  - Initializes the PassKeys instance.
  - Returns a promise that resolves when the manager is loaded.

### PassKeys

#### Methods

- **register(userId: string, userName: string, userDisplayName: string, rpName: string): Promise<{ id: string; payload: string }>**
  - Registers a user by creating and initializing the IndexedDB and then storing the encrypted results of the registration process in it.
  - Returns a promise that resolves with an object containing the unique identifier of the registration and the Base64 encoded string representation of the JSON stringified encrypted results.

- **authenticate(autoFill?: boolean): Promise<{ id: string; payload: string }>**
  - Initiates the WebAuthn authentication process, encrypts the results, and returns an object containing the passkey-id and the payload.
  - Returns a promise that resolves with an object containing the ID obtained from the authentication results and a base64 encoded string representing the JSON stringified object containing the encrypted authentication results.

- **autoFill(): Promise<boolean>**
  - Performs an auto-fill operation based on WebAuthn.
  - Returns a promise that resolves with a boolean value indicating whether the auto-fill operation was successful or not.

- **RegistrationStatus(): Promise<string>**
  - Checks the registration status of the user by interacting with the IndexedDB.
  - Returns a promise that resolves with a string indicating the registration status.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
