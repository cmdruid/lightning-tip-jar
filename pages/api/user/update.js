import { withSessionRoute } from "@/lib/session";

export default withSessionRoute(userInfo);

async function userInfo(req, res) {

  const { username, email } = req.body

  // Reject all methods other than GET.
  if (req.method !== 'POST') res.status(405).end();

  // If user session does not exist, return error.
  if (!req?.session?.user) res.status(401).end();

  req.session.user = { 
    ...req.session.user, 
    username, 
    email 
  }

  await req.session.save()

  return res.status(200).json(req.session.user);
}