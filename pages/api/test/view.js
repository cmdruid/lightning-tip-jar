import { withSessionRoute } from "@/lib/session";

export default withSessionRoute(viewLogin);

if (process.env.VERCEL_ENV === 'production') throw 'Do not push this endpoint to production!'

async function viewLogin(req, res) {
  res.status(200).json(req.session);
}