import { withSessionRoute } from '@/lib/session'
import { hasAccountEntry } from '@/lib/auth';

export default withSessionRoute(checkAccess);

async function checkAccess(req, res) {

  const { session } = req
  const { slug }    = req.query

  if (!slug) {
    return res.status(400).end()
  }
    
  if (!session?.user?.key) {
    return res.status(204).end()
  }

  if (!hasAccountEntry(session, slug)) { 
    return res.status(204).end() 
  }

  return res.status(200).end()
}