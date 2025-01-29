import NDK, { NDKPrivateKeySigner } from "@nostr-dev-kit/ndk";
import { ndk } from "./nostr";
import { getPriv, storePriv } from "./secret";

export const init = () => {
  const nsec = getPriv()
  if(!nsec) {
    return false
  } else {
    ndk.signer = new NDKPrivateKeySigner(nsec);
    return true
  }
}

export const signedIn = init()

export const login = (nsec: string) => {
  ndk.signer = new NDKPrivateKeySigner(nsec);
  storePriv(nsec)
}

export const signup = () => {
  const signer = NDKPrivateKeySigner.generate();
  const nsec = signer.privateKey || ""
  storePriv(nsec)
}