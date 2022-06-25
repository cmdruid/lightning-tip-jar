import { withSessionRoute } from "@/lib/session";

export default withSessionRoute(logout);

async function logout(req, res) {
  req.session.destroy();
  return res.writeHead(302, { Location: '/' }).end();
}