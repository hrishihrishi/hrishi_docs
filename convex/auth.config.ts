import dotenv from "dotenv";
dotenv.config();

export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
      applicationID: "convex",
    }
  ]
}