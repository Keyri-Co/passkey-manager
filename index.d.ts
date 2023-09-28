declare module "passkey-manager" {
  class PassKeys {
    /**
     * Constructs a PassKeys instance.
     * @throws Will throw an error if the browser does not support WebAuthn.
     */
    constructor();

    /**
     * Registers a listener for the specified event.
     * @param event - The name of the event.
     * @param callback - The callback to be invoked when the event is emitted.
     */
    on(event: string, callback: (data: any) => void): void;

    /**
     * Registers a user by creating and initializing the IndexedDB if it does not exist and then storing the encrypted results of the registration process in it.
     * @param userId - The unique identifier for the user.
     * @param userName - The name associated with the user.
     * @param userDisplayName - The display name associated with the user.
     * @param rpName - The name of the relying party.
     * @returns A promise that resolves with an object containing the unique identifier of the registration and the Base64 encoded string representation of the JSON stringified encrypted results.
     * @throws Will throw an error if any of the parameters are not provided, or if there are issues with starting the database or the encryption process.
     */
    register(
      userId: string,
      userName: string,
      userDisplayName: string,
      rpName: string
    ): Promise<{ id: string; payload: string }>;

    /**
     * Initiates the WebAuthn authentication process, encrypts the results, and returns an object containing the passkey-id and the payload.
     * @param autoFill - Optional parameter. If true, the method will attempt to auto-fill the authentication prompt. Default is false.
     * @returns A promise that resolves with an object containing the ID obtained from the authentication results and a base64 encoded string representing the JSON stringified object containing the encrypted authentication results.
     * @throws Will throw an error if there are issues with starting the database or if there are issues with encryption processes such as generating keys, signing data, or encrypting results.
     */
    authenticate(autoFill?: boolean): Promise<{ id: string; payload: string }>;

    /**
     * Performs an auto-fill operation based on WebAuthn.
     * @returns A promise that resolves with a boolean value indicating whether the auto-fill operation was successful or not.
     */
    autoFill(): Promise<boolean>;

    /**
     * Checks the registration status of the user by interacting with the IndexedDB.
     * @returns A promise that resolves with a string indicating the registration status. The string can be "registered" if one or more records are found in the "passkeys" object store, or "unknown" if no records are found.
     * @throws Will throw an error if there are issues with starting the database.
     */
    RegistrationStatus(): Promise<string>;
  }

  /**
   * Provides a safety layer over the PassKeys.
   */
  export class PasskeyManager {
    /**
     * Instance of PassKeys.
     */
    manager: PassKeys;

    /**
     * Loads the KeyManager and initializes the PassKeys.
     * @returns Resolves when the manager is loaded.
     */
    load(): Promise<void>;
  }
}