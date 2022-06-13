import { withSessionRoute } from "@/lib/session";

export default withSessionRoute(getUser);

async function getUser(req, res) {
  res.status(200).json(req.session);
}