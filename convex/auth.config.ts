// import { dotenv } from "dotenv";
// dotenv.config();

console.log(process.env.CLERK_JWT_ISSUER_DOMAIN);

export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
      applicationID: "convex",
    }
  ]
} 