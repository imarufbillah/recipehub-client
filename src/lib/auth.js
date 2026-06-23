import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db("recipehub");

export const auth = betterAuth({
  plugins: [jwt()],
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: String,
        defaultValue: "user",
        input: false,
      },
      bio: {
        type: String,
        defaultValue: "",
        input: false,
      },
      plan: {
        type: String,
        defaultValue: "free",
        enum: ["free", "premium"],
        input: false,
      },
      recipes: {
        type: Number,
        defaultValue: 0,
        input: false,
      },
      totalFavorites: {
        type: Number,
        defaultValue: 0,
        input: false,
      },
      totalLikes: {
        type: Number,
        defaultValue: 0,
        input: false,
      },
      isBlocked: {
        type: Boolean,
        defaultValue: false,
        input: false,
      },
    },
  },
});
