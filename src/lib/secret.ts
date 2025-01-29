async function encryptPrivateKey(privateKey: string, password: string): Promise<string> {
  const privateKeyBytes = new TextEncoder().encode(privateKey);
  const passwordBytes = new TextEncoder().encode(password);

  const salt = crypto.getRandomValues(new Uint8Array(16));

  const keyMaterial = await crypto.subtle.importKey(
      'raw',
      passwordBytes,
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
  );

  const key = await crypto.subtle.deriveKey(
      {
          name: 'PBKDF2',
          salt: salt,
          iterations: 100000,
          hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt']
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      privateKeyBytes
  );

  const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
  combined.set(salt, 0);
  combined.set(iv, salt.length);
  combined.set(new Uint8Array(encrypted), salt.length + iv.length);

  return btoa(String.fromCharCode(...combined));
}

async function decryptPrivateKey(encryptedData: string, password: string): Promise<string> {
  // Convert the base64-encoded encrypted data back to a Uint8Array
  const combined = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));

  // Extract the salt, IV, and encrypted data from the combined array
  const salt = combined.slice(0, 16); // First 16 bytes are the salt
  const iv = combined.slice(16, 28); // Next 12 bytes are the IV
  const encrypted = combined.slice(28); // Remaining bytes are the encrypted data

  // Convert the password to a Uint8Array
  const passwordBytes = new TextEncoder().encode(password);

  // Derive the key from the password using PBKDF2
  const keyMaterial = await crypto.subtle.importKey(
      'raw',
      passwordBytes,
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
  );

  const key = await crypto.subtle.deriveKey(
      {
          name: 'PBKDF2',
          salt: salt,
          iterations: 100000,
          hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
  );

  // Decrypt the private key using AES-GCM
  const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encrypted
  );

  // Convert the decrypted data back to a string
  return new TextDecoder().decode(decrypted);
}

export const storePriv = (priv: string, password: string) => {
  encryptPrivateKey(priv, password).then(v=>{
    localStorage.setItem('priv', v)
  })
}

export const getPriv = async (password: string) => {
  const cipher = localStorage.getItem('priv')
  if(!cipher) return null;
  return await decryptPrivateKey(cipher, password)
}