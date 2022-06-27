import { withSessionRoute } from "@/lib/session";

export default withSessionRoute(viewLogin);

async function viewLogin(req, res) {
  
  if (process.env.VERCEL_ENV === 'production') {
    return res.status(404).end()
  }

  return res.status(200).json(req.session);
}