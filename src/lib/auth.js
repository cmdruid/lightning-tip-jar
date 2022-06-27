export function stripAccountData(session, account) {
  // Separate sensitive keys from remaining data.
    const { keys, contact, ...data } = account

    if (hasAccountAccess(session, account)) {
      data.contact = account.contact
    }

    return { viewKey: keys.invoiceKey, ...data }
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
