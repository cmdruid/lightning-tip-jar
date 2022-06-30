import { encrypt }          from '@/lib/crypto'
import { encodeLnurl }      from '@/lib/utils'
import { utils, verify }    from '@noble/secp256k1'
import { withSessionRoute } from '@/lib/session'

const pending = new Map();

export default withSessionRoute(login);

async function login(req, res) {
  /* Authentication and login controller.
   */
  const { host } = req.headers
  
  const { tag, slug = '' } = req.query;

  if (tag && tag === 'login') {
    /* If login tag is present, forward to signature resolver. */
    console.log('Wallet request:', req.url)
    return sign(req, res)
  }

  const { session } = req;

  if (session?.user?.key) {
    /* If client has a current user session, return error.*/
    return res.status(200).json({ session: true, slug })
  }

  if (!session.auth) {
    /* Generate a new session for browser user. */
    session.auth = {
      ref: Buffer.from(utils.randomBytes(5)).toString('base64url'),
      msg: utils.bytesToHex(utils.randomBytes(32))
    }
    await req.session.save();
  }

  const { ref, msg } = session.auth;
        
  if (pending.has(ref)) {
    /* Check if a key has been provided for this reference. */
    const { key } = pending.get(ref) || {};

    if (key) {
      /* If key has been provided, add to user data. */
      session.user = { 
        key: await encrypt(key),
        ...session.user 
      }
      await req.session.save();
      pending.delete(ref);
      return res.status(200).json({ session: true, slug })
    }

  } else {
    /* If reference to auth session does not exist, create it. */
    pending.set(ref, { msg })
  }
  
  const fullUrl = `https://${host}/api/auth/login`,
        lnurl   = generateLnurl(fullUrl, ref, msg);

  return res.status(200).json({ session: false, lnurl });
}

async function sign(req, res) {
  /* Validate the signature received from a signing device. 
   */
  const { key, ref, sig } = req.query;

  if (key && ref && sig && pending.has(ref)) {
    /* If all params are present, fetch reference msg. */
    const data = pending.get(ref)

    console.log('pending:', pending)

    if (data.msg && verifySig(sig, data.msg, key)) {
      /* Verify that the reference message has been signed. */
      pending.set(ref, { key, ...data })
      return res.status(200).json({ 'status': 'ok' })
    }

    return res.status(200).json({ 
      'status': 'ERROR', 
      'reason': 'Signature check failed!!'
    })
  }

  return res.status(200).json({ 
    'status': 'ERROR',
    'reason': 'Auth session expired!'
  })
}

function generateLnurl(url, ref, msg) {
  return encodeLnurl(
    `${url}?ref=${ref}&tag=login&k1=${msg}&action=login`
  )
}

function verifySig(sig, msg, key) {
  /* Verify a secp256k1 signature.
   */
  const sigB = utils.hexToBytes(sig),
        msgB = utils.hexToBytes(msg);
  return verify(sigB, msgB, key)
}
