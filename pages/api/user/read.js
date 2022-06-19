import { withSessionRoute } from "@/lib/session";

export default withSessionRoute(userInfo);

async function userInfo(req, res) {

  // Reject all methods other than GET.
  if (req.method !== 'GET') res.status(405).end();

  // If user session does not exist, return error.
  if (!req?.session?.user) res.status(401).end();

  res.status(200).json(req.session.user);
}