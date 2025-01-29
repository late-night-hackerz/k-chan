import NDK, { NDKPrivateKeySigner } from "@nostr-dev-kit/ndk";
import { ndk } from "./nostr";
import { getPriv, storePriv } from "./secret";

export const init = async (password: string) => {
  const nsec = await getPriv(password)
  if(!nsec) {
    return false
  } else {
    ndk.signer = new NDKPrivateKeySigner(nsec);
    return true
  }
}

export const login = (nsec: string, password: string) => {
  ndk.signer = new NDKPrivateKeySigner(nsec);
  storePriv(nsec, password)
}

export const signup = (password: string) => {
  const signer = NDKPrivateKeySigner.generate();
  const nsec = signer.privateKey || ""
  storePriv(nsec, password)
}