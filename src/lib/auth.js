export function stripAccountKeys(account) {
  // Separate sensitive keys from remaining data.
    const { keys, ...data } = account
    return {
      viewKey: keys.invoiceKey,
      ...data
    }
}

export async function authenticateUser(session, account) {
  const userKey  = session?.user?.key,
        adminKey = account?.keys?.adminKey,
        slug     = account?.slug;

  if (!(slug && userKey && adminKey)) return false;

  if (!session?.wallet) {
    session.wallet = {}
    await session.save()
  }

  if (userKey === adminKey) {
    session.wallet[slug] = account.keys.walletKey
    await session.save()
  }
}

export function hasAccountEntry(session, slug) {
  if (!(session && session?.wallet && slug)) {
    return false;
  }
  return Object.hasOwn(session.wallet, slug);
}

export function hasAccountAccess(session, account) {
  const userKey  = session?.user?.key,
        adminKey = account?.keys?.adminKey;

  if (!(userKey && adminKey)) return

  return (userKey === adminKey)
}

export async function checkUserAccess(slug, callback) {
  if (!slug) return false;

  try {
    const res = await fetch(`/api/auth/check?slug=${slug}`)
    return callback((res.status === 200))
  } catch { return false }
}

export function isRestrictedPath(url, restrictedPaths) {
  try {
    const endpoint = url.split('/').pop()
    return restrictedPaths.includes(endpoint)
  } catch(e) { console.error(e); return true }
}
