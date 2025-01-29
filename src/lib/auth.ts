import NDK, { NDKPrivateKeySigner } from "@nostr-dev-kit/ndk";
import { ndk } from "./nostr";
import { getPriv, storePriv } from "./secret";

export const init = () => {
  const nsec = getPriv()
  if(!nsec) {
    return false
  } else {
    login(nsec)
    return true
  }
}

export const login = (nsec: string) => {
  ndk.signer = new NDKPrivateKeySigner(nsec);
}

export const signup = () => {
  const signer = NDKPrivateKeySigner.generate();
  const nsec = signer.privateKey || ""
  storePriv(nsec)
}